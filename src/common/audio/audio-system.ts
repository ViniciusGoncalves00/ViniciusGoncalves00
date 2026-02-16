import type { AudioAPI } from "./audio-API";
import { Storage } from "../storage/storage";
import { Pool } from "../others/pool";
import { AudioSource } from "./audio-source";
import { API } from "../API/api";

export class AudioSystem {
    private readonly storage = new Storage("audio");
    private readonly pools = new Map<AudioAPI, Pool<AudioSource>>();

    public constructor() {
        window.addEventListener(API.AUDIO_ENABLE, () => {
            this.setEnabled(true);
        })
        window.addEventListener(API.AUDIO_DISABLE, () => {
            this.setEnabled(false);
        })
        window.addEventListener(API.AUDIO_PLAY, (e: any) => {
            const audio = e.detail.audio;
            if (!audio) return;
            this.play(audio);
        })
    }

    public setEnabled(state: boolean): void {
        this.storage.save("enabled", String(state));
    }

    public isEnabled(): boolean {
        return this.storage.get("enabled") !== "false";
    }

    /**
     * Loads audio sources and creates a pool per AudioAPI key.
     */
    public load(
        sources: Map<AudioAPI, string[]>,
        voices: number = 4
    ): AudioSystem {
        for (const [key, srcList] of sources) {
            const pool = new Pool<AudioSource>(() => {
                return new AudioSource(srcList, {
                    preload: true
                });
            });

            for (let i = 0; i < voices; i++) {
                pool.release(pool.acquire());
            }

            this.pools.set(key, pool);
        }

        return this;
    }

    /**
     * Plays a sound using its pool.
     */
    public play(key: AudioAPI): void {
        if (!this.isEnabled()) return;

        const pool = this.pools.get(key);
        if (!pool) return;

        const source = pool.acquire();
        source.playRandom();

        setTimeout(() => {
            pool.release(source);
        }, 1000);
    }
}
