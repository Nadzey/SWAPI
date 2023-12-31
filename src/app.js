import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import { displayFilms } from './modules/DisplayFilms.js';
import { initNavigation, addHeroesModalClickHeandler } from './Pages/Heroes/HeroesPage.js';
import { smothScroll, renderBurgerMenu } from './modules/Navigation.js'; 

export default class App {
  init() {
    this.header = new Header();
    const container = document.querySelector(".container");
    container.prepend(this.header.render());

    this.footer = new Footer();
    container.appendChild(this.footer.render());

    renderBurgerMenu();
    smothScroll();
    this.loadContent();
  }

  loadContent() {
    displayFilms();
    initNavigation();
    addHeroesModalClickHeandler();
    }
  }
