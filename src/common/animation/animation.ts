// import * as THREE from 'three';

// export interface AnimationTask {
//     duration: number;
//     update(t: number): void;
// }

// export class MoveTask implements AnimationTask {
//     public constructor(
//         private object: THREE.Object3D,
//         private start: THREE.Vector3,
//         private target: THREE.Vector3,
//         public duration: number,
//         private easing: (t: number) => number = t => t
//     ) {}

//     update(t: number) {
//         const eased = this.easing(t);
//         this.object.position.lerpVectors(this.start, this.target, eased);
//     }
// }

// export class FadeTask implements AnimationTask {
//     public constructor(
//         private object: THREE.Object3D,
//         private from: number,
//         private to: number,
//         public duration: number,
//         private easing: (t: number) => number = t => t
//     ) {}

//     update(t: number) {
//         const eased = this.easing(t);
//         const value = this.from + (this.to - this.from) * eased;

//         this.object.children.forEach(child => {
//             const mat = (child as THREE.Mesh).material as THREE.Material;
//             mat.transparent = true;
//             mat.opacity = value;
//         });
//     }
// }

// export class AnimationRunner {
//     static run(task: AnimationTask): Promise<void> {
//         return new Promise(resolve => {
//             const startTime = performance.now();

//             const loop = (time: number) => {
//                 const elapsed = time - startTime;
//                 const t = Math.min(elapsed / task.duration, 1);

//                 task.update(t);

//                 if (t < 1) {
//                     requestAnimationFrame(loop);
//                 } else {
//                     resolve();
//                 }
//             };

//             requestAnimationFrame(loop);
//         });
//     }
// }

// export class ParallelTask implements AnimationTask {
//     public duration: number;

//     constructor(private tasks: AnimationTask[]) {
//         this.duration = Math.max(...tasks.map(t => t.duration));
//     }

//     update(t: number) {
//         this.tasks.forEach(task => {
//             const localT = Math.min(t * this.duration / task.duration, 1);
//             task.update(localT);
//         });
//     }
// }

// export class SequenceTask {
//     static async run(tasks: AnimationTask[]) {
//         for (const task of tasks) {
//             await AnimationRunner.run(task);
//         }
//     }
// }
