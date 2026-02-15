import { AudioAPI } from "./audio-API";

export const sounds = new Map<AudioAPI, string[]>([
    [AudioAPI.TOGGLE_ENABLE_01, ["/sfx/Minimalist1.mp3"]],
    [AudioAPI.TOGGLE_DISABLE_01, ["/sfx/Minimalist2.mp3"]],
    [AudioAPI.HOVER_ENTER_01, ["/sfx/Minimalist3.mp3"]],
    [AudioAPI.HOVER_LEAVE_01, ["/sfx/Minimalist4.mp3"]],
    [AudioAPI.PLACE_STARTED, ["/sfx/ui-pop-sound.mp3"]],
    [AudioAPI.PLACE_FINISHED, ["/sfx/Minimalist1.mp3"]],
    [AudioAPI.POP, ["/sfx/ui-pop-sound.mp3"]],
    [AudioAPI.BELL, ["/sfx/bell.mp3"]],
]);