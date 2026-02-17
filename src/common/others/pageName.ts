export class PageName {
    private static readonly base = "Portfolio";

    public static buildName(params?: string[]) {
        let name = this.base;
        params?.forEach(param => {
            name = name.concat(` → ${param}`)
        });
        return name;
    }
}