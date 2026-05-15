// pages/ai/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { ButtonBackComponent } from "../../components/button-back/index.js";
import { HomePage } from "../home/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";

const API_BASE = 'http://localhost:5000/api';

export class AIPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    async getData() {
        try {
            const response = await fetch(`${API_BASE}/ai/${this.id}`);
            if (!response.ok) return null;
            return await response.json();
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            return null;
        }
    }

    getHTML() {
        if (!this.data) {
            return `<div class="container"><h1>AI не найден</h1></div>`;
        }

        return `
            <main class="flex-grow-1 d-flex flex-column">
                <section class="hero gradient-bg flex-grow-1 d-flex align-items-center justify-content-center">
                    <div class="container-fluid text-center">
                        <div class="card mb-3 mx-auto" style="max-width: 1000px;">
                            <div class="row g-0 d-flex align-items-center">

                                <div class="col-md-4">
                                    <img src="${this.data.src}" class="img-fluid rounded-start p-5">
                                </div>

                                <div class="col-md-8">
                                    <div class="card-body">

                                        <div class="d-flex justify-content-around align-items-center p-3">
                                            <h1 class="mb-0">${this.data.title}</h1>
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

    async render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.data = await this.getData();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const buttonBack = new ButtonBackComponent(this.parent.querySelector('#back-button'));
        buttonBack.render(this.clickBack.bind(this));

        const accordion = new AccordionComponent(this.parent.querySelector('#accordion'), this.data);
        accordion.render();

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
