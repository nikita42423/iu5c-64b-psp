export class ButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', '<button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>');
    }
}
