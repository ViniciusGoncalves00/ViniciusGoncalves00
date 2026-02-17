import * as THREE from 'three';
import { AnimationSystem } from './animation-system';
import { AudioAPI } from '../audio/audio-API';
import { AnimationAPI } from './animation-API';
import { API } from '../API/api';

export type AnimationGroupConfig = {
    name: string;
    objects: THREE.Group[];

    duration: number;
    itemDelay?: number;

    tasks: (object: THREE.Group) => AnimationTask[];

    onStartSound?: AudioAPI;
    onFinishSound?: AudioAPI;
}

export async function runAnimationGroup(config: AnimationGroupConfig) {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    await Promise.all(
        config.objects.map(async (object, index) => {
            if (config.itemDelay) {
                await delay(index * config.itemDelay);
            }

            object.visible = true;

            const tasks = config.tasks(object);

            if (config.onStartSound) {
                window.dispatchEvent( new CustomEvent(API.AUDIO_PLAY, {
                    detail: { audio: config.onStartSound }
                }))
            }

            await AnimationSystem.run(
                new ParallelTask(tasks)
            );

            if (config.onFinishSound) {
                window.dispatchEvent( new CustomEvent(API.AUDIO_PLAY, {
                    detail: { audio: config.onFinishSound }
                }))
            }
        })
    );
}



/**
 * Base interface for any animation unit.
 *
 * An AnimationTask represents a time-based operation that evolves
 * from `t = 0` to `t = 1`.
 *
 * Important rules:
 * - `t` is always normalized in the range [0, 1]
 * - The task does NOT control time or frame updates
 * - The task only applies state changes based on `t`
 *
 * This interface enables:
 * - Task composition (parallel, sequence, groups)
 * - Separation of concerns between animation logic and timing
 * - A unified execution pipeline
 */
export interface AnimationTask {

    /**
     * Total duration of the animation in milliseconds.
     */
    duration: number;

    /**
     * Applies the animation state for the given normalized time.
     *
     * @param t Normalized time value in the range [0, 1]
     */
    update(t: number): void;
}

export interface ForceableAnimationTask {
    /**
     * Forces the target state to happen.
     */
    force: boolean;
    forceState(): void;
}

/**
 * Animation task responsible for interpolating the position
 * of a THREE.Object3D between two points in space.
 *
 * The interpolation is linear (lerp) and can be shaped
 * using an easing function.
 */
export class MoveTask implements AnimationTask, ForceableAnimationTask {

    /**
     * Creates a new position animation task.
     *
     * @param object   The Object3D to be animated
     * @param start    Starting position
     * @param target   Target position
     * @param duration Animation duration in milliseconds
     * @param easing   Optional easing function (default: linear)
     * @param force Forces the target state to happen
     */
    public constructor(
        private object: THREE.Object3D,
        private start: THREE.Vector3,
        private target: THREE.Vector3,
        public duration: number,
        private easing: (t: number) => number = t => t,
        public force: boolean = true,
    ) {}

    /**
     * Updates the object's position based on the normalized time.
     *
     * @param t Normalized time value in the range [0, 1]
     */
    public update(t: number): void {
        const eased = this.easing(t);
        this.object.position.lerpVectors(this.start, this.target, eased);
    }

    public forceState(): void {
        this.object.position.copy(this.target);
    }
}

/**
 * Animation task responsible for interpolating the opacity
 * of all materials attached to the children of a THREE.Object3D.
 *
 * Common use cases:
 * - Fade-in / fade-out effects
 * - Object reveal or disappearance
 *
 * Notes:
 * - Assumes child objects are THREE.Mesh instances
 * - Forces materials to be transparent
 */
export class FadeTask implements AnimationTask, ForceableAnimationTask {

    /**
     * Creates a new opacity animation task.
     *
     * @param object   The Object3D whose materials will be animated
     * @param from     Initial opacity value
     * @param to       Final opacity value
     * @param duration Animation duration in milliseconds
     * @param force Forces the target state to happen
     * @param easing   Optional easing function (default: linear)
     */
    public constructor(
        private object: THREE.Object3D,
        private from: number,
        private to: number,
        public duration: number,
        private easing: (t: number) => number = t => t,
        public force: boolean = true,
    ) {}

    /**
     * Updates the opacity of all child materials based on normalized time.
     *
     * @param t Normalized time value in the range [0, 1]
     */
    public update(t: number): void {
        const eased = this.easing(t);
        const value = this.from + (this.to - this.from) * eased;

        this.object.children.forEach(child => {
            const material = (child as THREE.Mesh).material as THREE.Material;
            material.transparent = true;
            material.opacity = value;
        });
    }

    public forceState(): void {
        this.object.children.forEach(child => {
            const material = (child as THREE.Mesh).material as THREE.Material;
            material.opacity = this.to;
        });
    }
}

/**
 * Composite animation task that executes multiple AnimationTasks
 * simultaneously.
 *
 * The total duration of the ParallelTask is the longest
 * duration among its child tasks.
 *
 * Each task receives a locally normalized time value
 * proportional to its own duration.
 */
export class ParallelTask implements AnimationTask {

    /**
     * Total duration of the parallel animation.
     */
    public duration: number;

    /**
     * Creates a new ParallelTask.
     *
     * @param tasks The animation tasks to run in parallel
     */
    public constructor(public readonly tasks: AnimationTask[]) {
        this.duration = Math.max(...tasks.map(t => t.duration));
    }

    /**
     * Updates all child tasks using adjusted normalized time.
     *
     * @param t Normalized time value in the range [0, 1]
     */
    public update(t: number): void {
        this.tasks.forEach(task => {
            const localT = Math.min((t * this.duration) / task.duration, 1);
            task.update(localT);
        });
    }
}

/**
 * Utility class responsible for executing AnimationTasks sequentially.
 *
 * Unlike other tasks, SequenceTask is not itself an AnimationTask.
 * Instead, it orchestrates multiple tasks by running them one
 * after another.
 *
 * This design keeps sequencing logic separate from animation logic.
 */
export class SequenceTask {

    /**
     * Runs a list of AnimationTasks in sequence.
     *
     * Each task starts only after the previous one completes.
     *
     * @param tasks List of animation tasks to execute sequentially
     */
    public static async run(tasks: AnimationTask[]): Promise<void> {
        for (const task of tasks) {
            await AnimationSystem.run(task);
        }
    }
}

export function isForceable(task: unknown): task is ForceableAnimationTask {
    return (
        typeof task === "object" &&
        task !== null &&
        "force" in task &&
        typeof (task as any).force === "boolean" &&
        "forceState" in task &&
        typeof (task as any).forceState === "function"
    );
}

export function isParallelTask(task: unknown): task is ParallelTask {
    return (
        typeof task === "object" &&
        task !== null &&
        "tasks" in task &&
        Array.isArray((task as any).tasks)
    );
}
