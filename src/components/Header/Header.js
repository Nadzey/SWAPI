import logo from '../../assets/image/logo.png';
import vaderIcon from '../../assets/image/vader.svg';

export default class Header {
    constructor() {
        this.element = document.createElement('header');
    }
   
    render() {
        this.element.innerHTML = `
        <div class="wrapper">
            <div class="header__logo">
                <a href="./index.html" class="logo">
                    <img src="${logo}" class="icon" alt="Logo">
                </a>
            </div>
            <div class="header__menu-block">
                <nav class="header__menu">
                    <ul class="header__menu-list">
                        <li class="header__menu-item">
                            <a href="./index.html#favorite_films" class="header__menu-link">Favorite Movies</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./index.html#about" class="header__menu-link">About</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./index.html#mobile_app" class="header__menu-link">Mobile app</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="#contacts" class="header__menu-link">Contact us</a>
                        </li>
                    </ul>
                </nav>
                <div class="header__menu">
                    <a href="./heroes.html" class="header__menu-link">
                        <span class="header__menu-counter">Heroes</span>
                        <img src="${vaderIcon}" alt="Heroes">
                    </a>
                </div>
            </div>
                <button class="header__burger-btn" id="burger">
                    <span></span><span></span>
                </button>
        </div>
        `;
        return this.element;
    }
}

