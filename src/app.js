import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import { displayFilms } from './modules/DisplayFilms.js';

// import MobileApp from './modules/mobileApp.js';
// import Contacts from './modules/contacts.js';

export default class App {
    init() {
        this.header = new Header();
        const container = document.querySelector('.container');
        container.prepend(this.header.render());

        this.loadContent();

        this.footer = new Footer();
        container.appendChild(this.footer.render()); 
    }

    loadContent() {
        // Здесь может быть логика для динамической загрузки контента в зависимости от URL или вкладки
        displayFilms();
        // Можно добавить вызовы для других модулей, например:
        // About.load();
        // FavoriteFilms.load();
        // MobileApp.load();
        // Contacts.load();
    }
}

