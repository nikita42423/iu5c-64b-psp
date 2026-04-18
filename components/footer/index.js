export class FooterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <footer class="mt-auto bg-primary-subtle text-center p-3 ">
                <span>© 2026 | Кузнецов Н. В. ИУ5Ц-64Б | Node + Bootstrap </span>
            </footer>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
