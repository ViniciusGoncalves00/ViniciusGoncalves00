import * as StyleAPI from "../style/style-API";

export enum API {
    AUDIO_ENABLE="audio:enable",
    AUDIO_DISABLE="audio:disable",
    AUDIO_PLAY="audio:play",
    AUDIO_STOP="audio:stop",

    STYLE_DARKMODE_ENABLE=`style:${StyleAPI.StorageKeys.DARK_MODE}:enable`,
    STYLE_DARKMODE_DISABLE=`style:${StyleAPI.StorageKeys.DARK_MODE}:disable`,

    STYLE_PALETTE_DEFAULT=`style:${StyleAPI.StorageKeys.PALETTE}:${StyleAPI.Palette.DEFAULT}`,
    STYLE_PALETTE_CYBERPUNK=`style:${StyleAPI.StorageKeys.PALETTE}:${StyleAPI.Palette.CYBERPUNK}`,
    STYLE_PALETTE_CUTE=`style:${StyleAPI.StorageKeys.PALETTE}:${StyleAPI.Palette.CUTE}`,
    STYLE_PALETTE_SYNTHWAVE=`style:${StyleAPI.StorageKeys.PALETTE}:${StyleAPI.Palette.SYNTHWAVE}`,

    STYLE_SHAPE_FLAT=`style:${StyleAPI.StorageKeys.SHAPE}:${StyleAPI.Shape.FLAT}`,
    STYLE_SHAPE_NEUMORPHIC=`style:${StyleAPI.StorageKeys.SHAPE}:${StyleAPI.Shape.NEUMORPHIC}`,
}