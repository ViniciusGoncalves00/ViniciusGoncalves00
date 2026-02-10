// export class StyleSystem {
//     private darkMode: boolean = false;
//     private currentPallete:  = false;

//     public load(source: Map<AudioAPI, string>): AudioSystem {
//         const audios = this.storage.load(source);
//         for (const kvp of audios) {
//             const audio = kvp[1];
//             audio.preload = "auto";
//         }

//         document.addEventListener("audio:play", (e: any) => {
//             if (!this.enabled) return;

//             const audio = this.storage.get(e.detail.audio);
//             if (!audio) return;

//             audio.currentTime = 0;
//             audio.play();
//         });
//         return this;
//     }
// }