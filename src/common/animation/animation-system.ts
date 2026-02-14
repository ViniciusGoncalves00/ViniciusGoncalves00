import { AnimationAPI } from "./animation-API";
import type { AnimationTask } from "./animation-tasks";

/**
 * Executes a single AnimationTask over time.
 *
 * Responsibilities:
 * - Manages real-time progression
 * - Normalizes elapsed time to [0, 1]
 * - Drives the animation using requestAnimationFrame
 * - Resolves a Promise when the task completes
 *
 * This class acts as the animation runtime.
 */
export class AnimationSystem {

    /**
     * Runs an AnimationTask until completion.
     *
     * @param task The animation task to execute
     * @returns A Promise that resolves when the animation finishes
     */
    static run(task: AnimationTask): Promise<void> {
        window.dispatchEvent(
            new CustomEvent(AnimationAPI.START, {
                detail: { task }
            })
        );

        return new Promise(resolve => {
            const startTime = performance.now();

            const loop = (time: number) => {
                const elapsed = time - startTime;
                const t = Math.min(elapsed / task.duration, 1);

                task.update(t);

                if (t < 1) {
                    requestAnimationFrame(loop);
                } else {
                    window.dispatchEvent(
                        new CustomEvent(AnimationAPI.FINISH, {
                            detail: { task }
                        })
                    );
                    resolve();
                }
            };

            requestAnimationFrame(loop);
        });
    }
}
