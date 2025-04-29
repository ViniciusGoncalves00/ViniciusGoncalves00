export class Navigation {
    private _window: Window;
    private _document: Document;

    private _rollingWeight: number = 1;
    private _pixelsTolerance: number = 2;
    private _headerVisible: boolean = true;

    public constructor(window: Window, document: Document) {
        this._window = window;
        this._document = document;

        this._document.addEventListener('alpine:init', () => {
            this.ListenWheel();
            this.ListenSections();
            // this.ListenHeader();
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

    private ListenHeader() {    
        const header = this._document.getElementById("header");
    
        if (!header) {
            console.warn("Header not found!");
            return;
        }
        
        const headerHeight = 64;
        let currentMousePosition = 0;
        let lastScrollY = 0;
    
        const updateVisibility = () => {
            console.log("Updating visibility", currentMousePosition, lastScrollY);
    
            if (currentMousePosition <= headerHeight || lastScrollY <= this._window.innerHeight) {
                header.classList.remove("hidden");
            } else {
                header.classList.add("hidden");
            }
        };
    
        this._window.addEventListener("mousemove", (event) => {
            currentMousePosition = event.clientY;
            updateVisibility();
        });
    
        this._window.addEventListener("scroll", () => {
            lastScrollY = this._window.scrollY;
            updateVisibility();
        });
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
