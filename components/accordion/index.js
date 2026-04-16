export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="accordion" id="accordion-${data.id}">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}-1">
                            Характеристики
                        </button>
                    </h2>
                    <div id="collapse-${data.id}-1" class="accordion-collapse collapse show" data-bs-parent="#accordion-${data.id}">
                        <div class="accordion-body">
                            <strong>Вес:</strong> ${data.weight}<br>
                            <strong>Рост:</strong> ${data.height}<br>
                            <strong>Продолжительность жизни:</strong> ${data.lifespan}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}-2">
                            Особенности породы
                        </button>
                    </h2>
                    <div id="collapse-${data.id}-2" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                        <div class="accordion-body">
                            ${data.features}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}-3">
                            Интересные факты
                        </button>
                    </h2>
                    <div id="collapse-${data.id}-3" class="accordion-collapse collapse" data-bs-parent="#accordion-${data.id}">
                        <div class="accordion-body">
                            ${data.facts}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
