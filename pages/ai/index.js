// pages/ai/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { ButtonBackComponent } from "../../components/button-back/index.js";
import { HomePage } from "../home/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class AIPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    async getData() {
        return new Promise((resolve) => {
            ajax.get(stockUrls.getStockById(this.id), (data, status) => {
                if (status === 200 && data) {
                    resolve(data);
                } else {
                    resolve(null);
                }
            });
        });
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
                                            <div id="delete-button-container"></div>
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

    clickDelete() {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            ajax.delete(stockUrls.removeStockById(this.id), (data, status) => {
                if (status === 204 || status === 200) {
                    window.location.hash = '#home';
                    window.location.reload();
                } else {
                    alert('Ошибка при удалении');
                }
            });
        }
    }

    addDeleteButton() {
        const container = document.getElementById('delete-button-container');
        if (container) {
            container.innerHTML = `
                <button id="delete-btn" class="btn btn-danger">
                    Удалить
                </button>
            `;
            document.getElementById('delete-btn').addEventListener('click', this.clickDelete.bind(this));
        }
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

        this.addDeleteButton();

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}