import { Slider } from './Slider.js';

export function displayFilms() {
    fetch('https://www.swapi.tech/api/films/')
        .then(response => response.json())
        .then(data => {
            const sliderContainer = document.querySelector('.slider');

            data.result.forEach((film, index) => {
                const slideElement = document.createElement('div');
                slideElement.className = `slider__slide ${index === 0 ? 'active slide-left' : ''}`;

                const episodeImage = `../src/assets/image/episode${film.properties.episode_id}.jpg`;
                slideElement.innerHTML = `
                    <div class="slider__slide-img">
                        <img src="${episodeImage}" alt="${film.properties.title}">
                    </div>
                    <div class="slider__slide_description">
                        <div class="slider__slide_title">
                            <h3>${film.properties.title}</h3>
                        </div>
                        <div class="slider__slide_text">
                            <p><strong>Episode:</strong> ${film.properties.episode_id}</p>
                            <p><strong>Director:</strong> ${film.properties.director}</p>
                            <p><strong>Producer:</strong> ${film.properties.producer}</p>
                            <p><strong>Opening Crawl:</strong> ${film.properties.opening_crawl}</p>
                        </div>
                    </div>
                `;
                sliderContainer.appendChild(slideElement);
                const slider = new Slider();
                slider.initEventListeners();
            });
        })
        .catch(error => console.error('Error fetching data: ', error));
}


