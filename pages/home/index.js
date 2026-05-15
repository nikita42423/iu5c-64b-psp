// pages/home/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { CardComponent } from "../../components/card/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { AIPage } from "../../pages/ai/index.js";

const API_BASE = 'http://localhost:5000/api';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('home-page');
    }

    async getData() {
        try {
            const response = await fetch(`${API_BASE}/ai`);
            if (!response.ok) throw new Error('Failed to fetch');
            return await response.json();
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            return [];
        }
    }

    getHTML() {
        return `
            <div id="home-page">
                <main>
                    <section class="gradient-bg">
                        <div class="container text-center">
                            <div class="p-5">
                                <h1 class="p-5 m-5">✦ Маршрут<span class="text-primary">ИИ</span> ✦</h1>
                                <p class="text-body-secondary fs-5 p-3">ChatGPT, Claude, Gemini, Grok и сотни других<br>нейросетей в одном API и web-чате.</p>
                                <div class="d-grid gap-3 d-md-block p-3">
                                    <button class="btn btn-primary btn-lg me-2">Начать бесплатно</button>
                                    <button class="btn btn-light border btn-lg">Изучить документацию</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div class="container">
                            <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center m-3" id="cards-container"></div>
                        </div>
                    </section>
                </main>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = e.currentTarget.dataset.id;
        const ai = new AIPage(this.parent, cardId);
        ai.render();
    }

    async render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footer = new FooterComponent(this.parent);
        footer.render();

        const cardsContainer = document.getElementById('cards-container');
        const data = await this.getData();
        data.forEach(item => {
            const card = new CardComponent(cardsContainer);
            card.render(item, this.clickCard.bind(this));
        });
    }
}
