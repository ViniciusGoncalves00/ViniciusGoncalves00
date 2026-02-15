import { Palette, Shape, StorageKeys } from "./style-API";
import { Storage } from "../storage/storage"
import { API } from "../API/api";

export class StyleSystem {
    private readonly storage: Storage = new Storage("style");

    public constructor() {
        window.addEventListener(API.STYLE_DARKMODE_ENABLE, () => {
            this.setDarkMode(true);
        })
        window.addEventListener(API.STYLE_DARKMODE_DISABLE, () => {
            this.setDarkMode(false);
        })
        
        window.addEventListener(API.STYLE_PALETTE_DEFAULT, () => {
            this.setPalette(Palette.DEFAULT);
        })
        window.addEventListener(API.STYLE_PALETTE_CYBERPUNK, () => {
            this.setPalette(Palette.CYBERPUNK);
        })
        window.addEventListener(API.STYLE_PALETTE_CUTE, () => {
            this.setPalette(Palette.CUTE);
        })
         window.addEventListener(API.STYLE_PALETTE_SYNTHWAVE, () => {
            this.setPalette(Palette.SYNTHWAVE);
        })

        window.addEventListener(API.STYLE_SHAPE_FLAT, () => {
            this.setShape(Shape.FLAT);
        })
        window.addEventListener(API.STYLE_SHAPE_NEUMORPHIC, () => {
            this.setShape(Shape.NEUMORPHIC);
        })
    }

    public load(): StyleSystem {
        const darkMode = this.storage.get(StorageKeys.DARK_MODE) || false;
        const palette = this.storage.get(StorageKeys.PALETTE) || Palette.DEFAULT;
        const shape = this.storage.get(StorageKeys.SHAPE) || Shape.FLAT;
        
        this.setDarkMode(darkMode as boolean);
        this.setPalette(palette as Palette);
        this.setShape(shape as Shape);
        
        return this;
    }

    public setDarkMode(state: boolean): StyleSystem {
        this.assign(StorageKeys.DARK_MODE, state);
        return this;
    }

    public isDarkMode(): boolean {
        return Boolean(this.storage.get(StorageKeys.DARK_MODE));
    }

    public setPalette(palette: Palette): StyleSystem {
        this.assign(StorageKeys.PALETTE, palette);
        return this;
    }

    public getPalette(): Palette {
        return this.storage.get(StorageKeys.PALETTE) as Palette;
    }

    public setShape(shape: Shape): StyleSystem {
        this.assign(StorageKeys.SHAPE, shape);
        return this;
    }

    public getShape(): Shape {
        return this.storage.get(StorageKeys.SHAPE) as Shape;
    }

    private assign(key: StorageKeys, value: string | boolean): StyleSystem {
        this.storage.save(key, String(value));
        document.documentElement.dataset[key] = String(value);
        return this;
    }
}