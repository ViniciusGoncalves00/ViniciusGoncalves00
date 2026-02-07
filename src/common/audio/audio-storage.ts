export class AudioStorage {
    private readonly data: Map<string, HTMLAudioElement> = new Map();

    public load(source: Map<string, string>): Map<string, HTMLAudioElement> {
        for (const kvp of source) {
            const key = kvp[0];
            const value = kvp[1];
            const audio = new Audio(value);
            this.data.set(key, audio);
        }
        return this.data;
    }

    public get(name: string): HTMLAudioElement | undefined {
        return this.data.get(name);
    }
}