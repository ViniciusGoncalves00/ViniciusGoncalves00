export class AnimationEasingFunctions {
    public static easeOutQuad(t: number): number {
        return 1 - Math.pow(1 - t, 2);
    }

    public static easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }

    public static easeOutBounce(t: number): number {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }

    public static easeInBounce(t: number): number {
        return 1 - AnimationEasingFunctions.easeOutBounce(1 - t);
    }

    public static easeInOutBounce(t: number): number {
        return t < 0.5
            ? (1 - AnimationEasingFunctions.easeOutBounce(1 - 2 * t)) / 2
            : (1 + AnimationEasingFunctions.easeOutBounce(2 * t - 1)) / 2;
    }
}