import { Palette, Shape, StorageKeys } from "./style-API";

export class StyleSystem {
    private darkMode: boolean = false;
    private palette: Palette = Palette.DEFAULT;
    private shape: Shape = Shape.FLAT;

    public load(): StyleSystem {
        const darkMode = localStorage.getItem(StorageKeys.DARK_MODE);
        const palette = localStorage.getItem(StorageKeys.PALETTE);
        const shape = localStorage.getItem(StorageKeys.SHAPE);
        
        this.setDarkMode(darkMode === "true");
        this.setPalette((palette ?? Palette.DEFAULT) as Palette);
        this.setShape((shape ?? Shape.FLAT) as Shape);
        
        return this;
    }

    public setDarkMode(state: boolean): StyleSystem {
        this.darkMode = state;

        this.assign(StorageKeys.DARK_MODE, state);
        this.save(StorageKeys.DARK_MODE, state);

        return this;
    }

    public getDarkMode(): boolean {
        return this.darkMode;
    }

    public setPalette(palette: Palette): StyleSystem {
        this.palette = palette;

        this.assign(StorageKeys.PALETTE, palette);
        this.save(StorageKeys.PALETTE, palette);

        return this;
    }

    public getPalette(): Palette {
        return this.palette;
    }

    public setShape(shape: Shape): StyleSystem {
        this.shape = shape;

        this.assign(StorageKeys.SHAPE, shape);
        this.save(StorageKeys.SHAPE, shape);

        return this;
    }

    public getShape(): Shape {
        return this.shape;
    }

    private assign(key: StorageKeys, value: string | boolean): StyleSystem {
        document.documentElement.dataset[key] = String(value);
        return this;
    }

    private save(key: StorageKeys, value: string | boolean): StyleSystem { 
        localStorage.setItem(key, String(value));
        return this;
    }
}