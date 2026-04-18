export class AccordionComponent {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    getHTML() {
        const data = this.data;

        return `
            <div class="accordion text-start" id="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
                        Подробнее
                    </button>
                    </h2>

                    <div id="collapse1" class="accordion-collapse collapse" data-bs-parent="#accordion">
                        <div class="accordion-body p-0">
                            <p class="p-3">Компания: ${data.company}</p>

                            <div class="accordion" id="accordion1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false">
                                        Описание
                                    </button>
                                    </h2>
                                    <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#accordion1">
                                    <div class="accordion-body">
                                        <p>${data.description}</p>
                                    </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false">
                                        Функции
                                    </button>
                                    </h2>
                                    <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#accordion1">
                                    <div class="accordion-body">
                                        <ul class="mb-0">
                                            ${data.features.map(f => `<li>${f}</li>`).join('')}
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
