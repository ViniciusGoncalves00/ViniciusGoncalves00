import { AudioAPI } from "./audio-API";

export const sounds = new Map<AudioAPI, string[]>([
    [AudioAPI.TOGGLE_ENABLE_01, [`${import.meta.env.BASE_URL}/sfx/Minimalist1.mp3`]],
    [AudioAPI.TOGGLE_DISABLE_01, [`${import.meta.env.BASE_URL}/sfx/Minimalist2.mp3`]],
    [AudioAPI.HOVER_ENTER_01, [`${import.meta.env.BASE_URL}/sfx/Minimalist3.mp3`]],
    [AudioAPI.HOVER_LEAVE_01, [`${import.meta.env.BASE_URL}/sfx/Minimalist4.mp3`]],
    [AudioAPI.PLACE_STARTED, [`${import.meta.env.BASE_URL}/sfx/ui-pop-sound.mp3`]],
    [AudioAPI.PLACE_FINISHED, [`${import.meta.env.BASE_URL}/sfx/Minimalist1.mp3`]],
    [AudioAPI.POP, [`${import.meta.env.BASE_URL}/sfx/ui-pop-sound.mp3`]],
    [AudioAPI.BELL, [`${import.meta.env.BASE_URL}/sfx/bell.mp3`]],
]);