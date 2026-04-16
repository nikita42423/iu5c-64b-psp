import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const dogs = {
            1: {
                id: 1,
                src: "https://images.dog.ceo/breeds/husky/n02110185_13197.jpg",
                title: "Хаски",
                text: "Энергичная и дружелюбная порода",
                weight: "16-27 кг",
                height: "50-60 см",
                lifespan: "12-14 лет",
                features: "Требуют много физической активности, имеют густую шерсть, дружелюбны к детям",
                facts: "Хаски не лают, а воют. Они могут выть на разные мелодии!"
            },
            2: {
                id: 2,
                src: "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
                title: "Сиба-ину",
                text: "Маленькая, но гордая японская собака",
                weight: "8-11 кг",
                height: "35-41 см",
                lifespan: "13-16 лет",
                features: "Независимые, чистоплотные, могут быть упрямыми",
                facts: "Сиба-ину — одна из древнейших пород, известная своим знаменитым 'улыбкой'"
            },
            3: {
                id: 3,
                src: "https://images.dog.ceo/breeds/sheepdog-english/n02105641_8372.jpg",
                title: "Золотистый ретривер",
                text: "Умная и преданная семейная собака",
                weight: "25-34 кг",
                height: "51-61 см",
                lifespan: "10-12 лет",
                features: "Очень умные, легко обучаются, обожают плавать",
                facts: "Ретриверы часто работают собаками-поводырями и в поисково-спасательных службах"
            },
            4: {
                id: 4,
                src: "https://images.dog.ceo/breeds/sheepdog-english/n02105641_8372.jpg",
                title: "Английская овчарка",
                text: "Преданная, умная, отличный пастух",
                weight: "20-30 кг",
                height: "50-56 см",
                lifespan: "10-12 лет",
                features: "Отличный пастух, очень преданный, хорошо ладит с детьми",
                facts: "Английские овчарки — одни из самых умных пород собак"
            }
        };
        return dogs[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(data);
    }
}
