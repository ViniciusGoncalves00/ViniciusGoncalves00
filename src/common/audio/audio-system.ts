import type { AudioAPI } from "./audio-API";
import { AudioStorage } from "./audio-storage";

export class AudioSystem {
    private readonly storage: AudioStorage = new AudioStorage();
    private enabled: boolean = true;

    public setEnabled(state: boolean) {
        this.enabled = state;
    }

    public load(source: Map<AudioAPI, string>): AudioSystem {
        const audios = this.storage.load(source);
        for (const kvp of audios) {
            const audio = kvp[1];
            audio.preload = "auto";
        }

        window.addEventListener("audio:play", (e: any) => {
            if (!this.enabled) return;

            const audio = this.storage.get(e.detail.audio);
            if (!audio) return;

            audio.currentTime = 0;
            audio.play();
        });
        return this;
    }

    public get(key: AudioAPI): HTMLAudioElement | undefined {
        return this.storage.get(key);
    }
}