export class NavbarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <nav class="navbar navbar-expand-lg border-bottom">
                <div class="container-fluid row">

                    <div class="col-4 text-start">
                        <a class="navbar-brand ms-5" href="">Маршрут<span class="text-primary">ИИ</span></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Переключатель навигации">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div class="col-4">
                        <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link" href="#calculator">Калькулятор</a>
                                <a class="nav-link" href="#about">Обо мне</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 text-end">
                        <button type="button" class="btn btn-primary">Вход</button>
                    </div>

                </div>
            </nav>
    `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
