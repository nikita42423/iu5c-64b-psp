import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://images.dog.ceo/breeds/husky/n02110185_13197.jpg",
                title: "Сибирский хаски",
                text: "Энергичная, дружелюбная, выносливая порода"
            },
            {
                id: 2,
                src: "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
                title: "Сиба-ину",
                text: "Маленькая, но гордая и независимая японская собака"
            },
            {
                id: 3,
                src: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg",
                title: "Золотистый ретривер",
                text: "Добрая, умная, отличная семейная собака"
            },
            {
                id: 4,
                src: "https://images.dog.ceo/breeds/sheepdog-english/n02105641_8372.jpg",
                title: "Английская овчарка",
                text: "Преданная, умная, отличный пастух"
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const src = e.target.dataset.src;
        const title = e.target.dataset.title;
        const text = e.target.dataset.text;

        const productPage = new ProductPage(this.parent, cardId, src, title, text)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })

    }
}
