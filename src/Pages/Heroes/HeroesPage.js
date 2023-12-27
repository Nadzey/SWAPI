import { StarWarsCard } from '../../modules/StarWarsCard.js';

export function initNavigation() {
    const navigationButtons = document.querySelectorAll('.buttons_navigation__button');

    function setActiveButton(activeButtonId) {
        navigationButtons.forEach(button => {
            if (button.id === activeButtonId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    navigationButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveButton(button.id);
            let url;
            switch (button.id) {
                case 'button__navigation__planets':
                    url = 'https://www.swapi.tech/api/planets/';
                    break;
                case 'button__navigation__vehicles':
                    url = 'https://www.swapi.tech/api/vehicles/';
                    break;
                default:
                    url = 'https://www.swapi.tech/api/people/';
                    break;
            }
            loadData(url, button.id.replace('button__navigation__', ''));
        });
    });

    const defaultButton = document.getElementById('button__navigation__characters');
    setActiveButton(defaultButton.id);
    loadData('https://www.swapi.tech/api/people/', 'people');
}


function loadData(url, category) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.heroes__items');
            container.innerHTML = '';
            data.results.forEach(itemData => {
                const itemCard = new StarWarsCard(itemData, category);
                container.appendChild(itemCard.generateCard());
            });
            toggleRefreshButton(); 
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function toggleRefreshButton() {
    const screenWidth = window.innerWidth;
    const heroesItems = document.querySelectorAll('.card');
    const isHiddenItemPresent = Array.from(heroesItems).some(item => item.style.display === 'none' || item.style.display === '');
    const refreshButtonContainer = document.querySelector('.refresh_button-container');

    if (screenWidth <= 768 && isHiddenItemPresent) {
        refreshButtonContainer.style.display = 'flex';
    } else {
        refreshButtonContainer.style.display = 'none';
    }
}


function showAllGalleryItems() {
    const heroesItems = document.querySelectorAll('.card');
    heroesItems.forEach(item => item.style.display = 'block');
    toggleRefreshButton(); 
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.querySelector('.refresh_button-container');
    if (refreshButton) {
        refreshButton.addEventListener('click', showAllGalleryItems);
    }

    window.addEventListener('resize', toggleRefreshButton);
});
