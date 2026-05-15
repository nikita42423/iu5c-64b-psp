// pages/home/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { CardComponent } from "../../components/card/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { AIPage } from "../ai/index.js";
import { CreatePage } from "../create/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = '';
    }

    get pageRoot() {
        return document.getElementById('home-page');
    }

    async getData() {
        let url = stockUrls.getStocks();
        if (this.currentFilter) {
            url += `?title=${encodeURIComponent(this.currentFilter)}`;
        }
        const { data, status } = await ajax.get(url);
        if (status === 200 && data) {
            return Array.isArray(data) ? data : [];
        }
        return [];
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
                                    <a href="#create" class="btn btn-primary btn-lg me-2">Создать карточку</a>
                                    <button class="btn btn-light border btn-lg">Изучить документацию</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div class="container">
                            <div class="row justify-content-center m-3">
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <input type="text" id="filter-input" class="form-control" 
                                               placeholder="Фильтр по названию..." 
                                               value="${this.currentFilter}">
                                        <button id="filter-btn" class="btn btn-primary">Найти</button>
                                        <button id="clear-filter-btn" class="btn btn-secondary">Очистить</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center m-3" id="cards-container"></div>
                        </div>
                    </section>
                </main>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = parseInt(e.currentTarget.dataset.id);
        const ai = new AIPage(this.parent, cardId);
        ai.render();
    }

    async clickFilter() {
        const input = document.getElementById('filter-input');
        this.currentFilter = input.value.trim();
        await this.renderCards();
    }

    async clickClearFilter() {
        this.currentFilter = '';
        document.getElementById('filter-input').value = '';
        await this.renderCards();
    }

    async renderCards() {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        const data = await this.getData();
        data.forEach(item => {
            const card = new CardComponent(cardsContainer);
            card.render(item, this.clickCard.bind(this));
        });
    }

    addFilterListeners() {
        const filterBtn = document.getElementById('filter-btn');
        const clearFilterBtn = document.getElementById('clear-filter-btn');
        const filterInput = document.getElementById('filter-input');

        if (filterBtn) {
            filterBtn.addEventListener('click', this.clickFilter.bind(this));
        }
        if (clearFilterBtn) {
            clearFilterBtn.addEventListener('click', this.clickClearFilter.bind(this));
        }
        if (filterInput) {
            filterInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.clickFilter();
                }
            });
        }
    }

    render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footer = new FooterComponent(this.parent);
        footer.render();

        this.renderCards();
        this.addFilterListeners();
    }
}