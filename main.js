import { HomePage } from "./pages/home/index.js";
import { AboutPage } from "./pages/about/index.js";
import { CalculatorPage } from "./pages/calculator/index.js";

const root = document.getElementById('root');

function router() {
    const hash = window.location.hash || '#home';

    switch(hash) {
        case '#home':
            const homePage = new HomePage(root);
            homePage.render();
            break;
        case '#about':
            const aboutPage = new AboutPage(root);
            aboutPage.render();
            break;
        case '#calculator':
            const calculatorPage = new CalculatorPage(root);
            calculatorPage.render();
            break;
        default:
            const defaultPage = new HomePage(root);
            defaultPage.render();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
