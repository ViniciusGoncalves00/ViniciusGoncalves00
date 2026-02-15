export class AnimationEasingFunctions {
    public static easeOutQuad(t: number): number {
        return 1 - Math.pow(1 - t, 2);
    }

    public static easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }
}