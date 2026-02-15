import { AudioSystem } from "./audio/audio-system";
import { StyleSystem } from "./style/style-system";
import { sounds } from "./audio/audio-list";
import { API } from "./API/api";

export class Entry {
    private static _instance: Entry | null = null;
    public audioSystem = new AudioSystem();
    public styleSystem = new StyleSystem();

    private constructor() {   
        this.audioSystem.load(sounds);
        this.styleSystem.load();
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