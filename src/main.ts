import 'alpinejs';
import './styles.css';
import Alpine from "alpinejs";
import { Navigation } from './script/navigation';

class Program {
    public static Main(): void {
        new Navigation(window, document);
    }
}

Program.Main()

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

(window as Window).Alpine = Alpine;

document.addEventListener("bundleLoaded", () => {
    Alpine.start();

    if (localStorage.getItem('theme') === 'custom_light')
    {
        document.documentElement.setAttribute('data-theme', 'custom_light');
    }
    else
    {
        document.documentElement.setAttribute('data-theme', 'custom_dark');
    }
});