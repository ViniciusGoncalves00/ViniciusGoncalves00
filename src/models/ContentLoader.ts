import 'alpinejs';
import './styles.css';
import Alpine from "alpinejs";
import frontMatter from 'front-matter';
import { marked } from 'marked';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

interface ArticleAttributes {
    title: string;
    subtitle?: string;
    release?: string;
    update?: string;
  }

window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("test")
    const container = document.getElementById("articles");

    const articles = [
        "article1", "article2"
    ];

    for (const file of articles) {
        try {
            // Fetch o arquivo Markdown
            const response = await fetch(`src/articles/${file}/${file}.md`);
            const markdown = await response.text();

            // Processar o Front Matter (metadados)
            const { attributes, body } = frontMatter<ArticleAttributes>(markdown);

            // Converter o corpo Markdown para HTML
            const contentHtml = marked(body);

            // Criar o elemento para o artigo
            const articleElement = document.createElement("div");
            // articleElement.classList.add("w-[512px]", "p-[16px]", "bg-white", "rounded-md", "shadow");

            // Adicionar conteúdo ao elemento
            articleElement.innerHTML = `
            <div class="w-full h-full flex items-center justify-between bg-primary drop-shadow-custom-shadow-2">
                <div class="w-[calc(100%-192px)] h-full p-[8px]">
                    <div>${attributes.title || "Title not found"}</div>
                    <div>${attributes.subtitle || "Subtitle not found"}</div>
                </div>
                <div class="w-[192px] h-full flex flex-col items-end p-[8px]">
                    <div class="w-full h-full flex items-center justify-end space-x-[8px]">
                        <span>release:</span>
                        <span>${attributes.release || "Date not found"}</span>
                    </div>
                    <div class="w-full h-full flex items-center justify-end space-x-[8px]">
                        <span>last update:</span>
                        <span>${attributes.update || "Date not found"}</span>
                    </div>
                </div>
            </div>
            `;

            // Adicionar ao container
            if(container != null)
            {
                container.appendChild(articleElement);
            }
        } catch (error) {
            console.error(`Erro ao carregar o arquivo ${file}:`, error);
        }
    }
});