// pages/create/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { HomePage } from "../home/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <main class="flex-grow-1 d-flex flex-column">
                <section class="gradient-bg flex-grow-1 d-flex align-items-center justify-content-center">
                    <div class="container">
                        <div class="card mx-auto" style="max-width: 600px;">
                            <div class="card-header bg-primary text-white">
                                <h3 class="mb-0">Создание новой карточки</h3>
                            </div>
                            <div class="card-body">
                                <form id="create-form">
                                    <div class="mb-3">
                                        <label for="input-title" class="form-label">Название</label>
                                        <input type="text" class="form-control" id="input-title" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="input-src" class="form-label">URL изображения</label>
                                        <input type="url" class="form-control" id="input-src" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="input-description" class="form-label">Описание</label>
                                        <textarea class="form-control" id="input-description" rows="3" required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="input-link" class="form-label">Ссылка на сайт</label>
                                        <input type="url" class="form-control" id="input-link">
                                    </div>
                                    <div class="mb-3">
                                        <label for="input-features" class="form-label">Функции (через запятую)</label>
                                        <input type="text" class="form-control" id="input-features" placeholder="Функция 1, Функция 2">
                                    </div>
                                    <div class="mb-3">
                                        <label for="input-company" class="form-label">Компания</label>
                                        <input type="text" class="form-control" id="input-company">
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-primary">Создать</button>
                                        <a href="#home" class="btn btn-secondary">Отмена</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }

    clickSubmit(e) {
        e.preventDefault();

        const title = document.getElementById('input-title').value.trim();
        const src = document.getElementById('input-src').value.trim();
        const description = document.getElementById('input-description').value.trim();
        const link = document.getElementById('input-link').value.trim();
        const featuresStr = document.getElementById('input-features').value.trim();
        const company = document.getElementById('input-company').value.trim();

        const features = featuresStr ? featuresStr.split(',').map(f => f.trim()).filter(f => f) : [];

        const data = { title, src, description };
        if (link) data.link = link;
        if (features.length > 0) data.features = features;
        if (company) data.company = company;

        ajax.post(stockUrls.createStock(), data, (response, status) => {
            if (status === 201) {
                window.location.hash = '#home';
                window.location.reload();
            } else {
                alert('Ошибка при создании карточки');
            }
        });
    }

    addFormListener() {
        const form = document.getElementById('create-form');
        if (form) {
            form.addEventListener('submit', this.clickSubmit.bind(this));
        }
    }

    render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footer = new FooterComponent(this.parent);
        footer.render();

        this.addFormListener();
    }
}