import { AudioAPI } from "./audio/audio-API";
import { AudioSystem } from "./audio/audio-system";

export class Entry {
    private static _instance: Entry | null = null;
    public audioSystem = new AudioSystem();

    private constructor() {
        const sounds = new Map<AudioAPI, string>([
            [AudioAPI.TOGGLE_ENABLE_01, "/sfx/Minimalist1.mp3"],
            [AudioAPI.TOGGLE_DISABLE_01, "/sfx/Minimalist2.mp3"],
            [AudioAPI.HOVER_ENTER_01, "/sfx/Minimalist3.mp3"],
            [AudioAPI.HOVER_LEAVE_01, "/sfx/Minimalist4.mp3"],
        ]);
        this.audioSystem.load(sounds);
    }

    public static initialize(): void {
        if (!this._instance) {
            this._instance = new Entry();
        }
    }
    
    public static instance(): Entry {
        if (!this._instance) {
            this._instance = new Entry();
        }
        return this._instance;
    }
}