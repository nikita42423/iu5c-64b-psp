// components/card/index.js
export class CardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col">
                <div class="card" id="card-${data.id}" data-id="${data.id}">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${data.title}</h5>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const card = document.getElementById(`card-${data.id}`);
        if (card) {
            card.addEventListener("click", listener);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
