import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { ButtonBackComponent } from "../../components/button-back/index.js";
import { HomePage } from "../home/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";

export class AIPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const database = {
            1: {
                name: "ChatGPT",
                src: "https://cdn.fusionchat.ai/blog/chatgpt/new-chatgpt-feature-makes-it-easier-to-find-old-chats-fn7bzrnde8vln7r4y69r.png",
                description: "ChatGPT — языковая модель от OpenAI для диалогов и текстов.",
                features: ["Диалоги", "Генерация текста", "Код"],
                company: "OpenAI"
            },
            2: {
                name: "DeepSeek",
                src: "https://tiku.ru/wp-content/uploads/2025/02/deepseek-ai.jpg",
                description: "DeepSeek — мощная модель для работы с кодом и логических рассуждений.",
                features: ["Анализ кода", "Математика", "Бесплатно"],
                company: "DeepSeek AI"
            },
            3: {
                name: "Gemini",
                src: "https://jetstream.blog/wp-content/uploads/2026/02/Google-Gemini-1-1.jpg",
                description: "Gemini — мультимодальная модель от Google для текста, изображений, аудио и видео.",
                features: ["Текст", "Изображения", "Видео"],
                company: "Google"
            }
        };

        return database[this.id];
    }

    getHTML() {
        const data = this.getData();

        if (!data) {
            return `<div class="container"><h1>AI не найден</h1></div>`;
        }

        return `
            <main class="flex-grow-1 d-flex flex-column">
                <section class="hero gradient-bg flex-grow-1 d-flex align-items-center justify-content-center">
                    <div class="container-fluid text-center">
                        <div class="card mb-3 mx-auto" style="max-width: 1000px;">
                            <div class="row g-0 d-flex align-items-center">

                                <div class="col-md-4">
                                    <img src="${data.src}" class="img-fluid rounded-start m-5">
                                </div>

                                <div class="col-md-8">
                                    <div class="card-body">

                                        <div class="d-flex justify-content-around align-items-center p-3">
                                            <h1 class="mb-0">${data.name}</h1>
                                            <div id="back-button"></div>
                                        </div>

                                        <div class="accordion text-start" id="accordion"></div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }

    clickBack() {
        const homePage = new HomePage(this.parent);
        homePage.render();
    }

    render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const buttonBack = new ButtonBackComponent(this.parent.querySelector('#back-button'));
        buttonBack.render(this.clickBack.bind(this));

        const accordion = new AccordionComponent(this.parent.querySelector('#accordion'), this.getData());
        accordion.render();

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
