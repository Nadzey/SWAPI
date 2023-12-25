document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.swapi.tech/api/films/')
        .then(response => response.json())
        .then(data => displayFilms(data.result))
        .catch(error => console.error('Error fetching data: ', error));
});

function displayFilms(films) {
    const filmsContainer = document.getElementById('films');

    films.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.innerHTML = `
            <h2>${film.properties.title}</h2>
            <p><strong>Episode:</strong> ${film.properties.episode_id}</p>
            <p><strong>Release Date:</strong> ${film.properties.release_date}</p>
            <p><strong>Director:</strong> ${film.properties.director}</p>
            <p><strong>Producer:</strong> ${film.properties.producer}</p>
            <p><strong>Opening Crawl:</strong> ${film.properties.opening_crawl}</p>
            <a href="${film.properties.url}" target="_blank">More Info</a>
            `;
        filmsContainer.appendChild(filmElement);
    });
}


