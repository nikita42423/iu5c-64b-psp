import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class AboutPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <main class="flex-grow-1 d-flex flex-column">
                <section class="gradient-bg flex-grow-1 d-flex align-items-center justify-content-center">
                    <div class="container-fluid text-center">

                        <div class="card mx-auto mb-3" style="max-width: 1000px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="image1.jpg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body text-start">
                                        <h1 class="card-title">Кузнецов Никита Вадимович</h1>
                                        <p class="fs-4">Студент группы ИУ5Ц-64Б</p>
                                        <p class="fs-4"><strong>Семестр:</strong> 6</p>
                                        <p class="fs-4"><strong>Предмет:</strong> Программирование сетевых приложений</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
