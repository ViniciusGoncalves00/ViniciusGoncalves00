import 'alpinejs';
import './styles.css';
import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();
    const savedTheme = localStorage.getItem('theme') || 'custom_light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});