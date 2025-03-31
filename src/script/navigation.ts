export class Navigation {
    private _window: Window;
    private _document: Document;

    private _rollingWeight: number = 1;
    private _pixelsTolerance: number = 2;

    public constructor(window: Window, document: Document) {
        this._window = window;
        this._document = document;

        this._document.addEventListener('alpine:init', () => {
            this.ListenWheel();
            this.ListenSections();
        });
    }

    private ListenWheel() {
        this._window.addEventListener("wheel", (event) => {
            event.preventDefault();

            const viewportHeight = this._window.innerHeight;
            const scrollAmount = viewportHeight * this._rollingWeight;

            this._window.scrollTo({
                top: this._window.scrollY + (event.deltaY > 0 ? scrollAmount : -scrollAmount),
                behavior: "smooth",
            });
        }, { passive: false });
    }

    private ListenSections() {
        const observer = new MutationObserver(() => {
            this.highlightCurrentSection();
        });

        const element = this._document.getElementById('body');
        if (element) {
            observer.observe(element, { childList: true, subtree: true });
        }

        this._window.addEventListener('load', this.highlightCurrentSection.bind(this));
        this._window.addEventListener('scroll', this.highlightCurrentSection.bind(this));
    }

    private highlightCurrentSection() {
        const navigationOptions = this._document.querySelectorAll('.navigation-option');
        const sections = this._document.querySelectorAll('section');

        const viewportHeight = this._window.innerHeight;
        const scrollPosition = this._window.scrollY;
        const windowCenter = scrollPosition + viewportHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + viewportHeight;

            if (windowCenter >= sectionTop - this._pixelsTolerance && windowCenter < sectionBottom - this._pixelsTolerance) {
                navigationOptions.forEach((link) => link.classList.remove('opacity-100'));

                navigationOptions[index].classList.add('opacity-100');
            }
        });
    }
}
