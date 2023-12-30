import { Modal } from "./Modal";

export class HeroesModal extends Modal {
    constructor(classes, data) {
        super(classes);

        this.uid = data.uid;
        this.description = data.description;
        this.name = data.properties.name;
        this.height = data.properties.height;
        this.mass = data.properties.mass;
        this.hair_color = data.properties.hair_color;
        this.skin_color = data.properties.skin_color;
        this.eye_color = data.properties.eye_color;
        this.birth_year = data.properties.birth_year;
        this.diameter = data.properties.diameter;
        this.gravity = data.properties.gravity;
        this.rotation_period = data.properties.rotation_period;
        this.orbital_period = data.properties.orbital_period;
        this.population = data.properties.population;
        this.climate = data.properties.climate;
        this.terrain = data.properties.terrain;
        this.surface_water = data.properties.surface_water;
        this.model = data.properties.model;
        this.vehicle_class = data.properties.vehicle_class;
        this.manufacturer = data.properties.manufacturer;
        this.cost_in_credits = data.properties.cost_in_credits;
        this.length = data.properties.length;
        this.crew = data.properties.crew;
        this.passengers = data.properties.passengers;
        this.max_atmosphering_speed = data.properties.max_atmosphering_speed;
        this.cargo_capacity = data.properties.cargo_capacity;
    }
    
    getImagePath() {
        const formatImageName = (name) => {
            return name.toLowerCase().replace(/[\s\/]/g, '-').concat('.jpg');
        };
        const imageName = formatImageName(this.name);
        return `./img/${imageName}`;
    }

    generateHeroesContent() {
        let template = '';
        let modalContent = document.createElement('div');
        modalContent.className = 'modal__content__container';
        modalContent.setAttribute('data-id', this.uid);

        const imagePath = this.getImagePath();
        template += `
            <div class="card__image-container">
                <img src="${imagePath}" alt="${this.name}" onerror="this.src='./img/vader.svg'">
            </div>
            <div class="modal__content">
                <h3 class="modal__title">Name: ${this.name}</h3>
                ${this.height ? `<p>Height: ${this.height}</p>` : ""}
                ${this.birth_year ? `<p>Birth Year: ${this.birth_year}</p>` : ""}
                ${this.diameter ? `<p>Diameter: ${this.diameter}</p>` : ""}
                ${this.gravity ? `<p>Gravity: ${this.gravity}</p>` : ""}
                ${this.model ? `<p>Model: ${this.model}</p>` : ""}
                ${this.vehicle_class ? `<p>Vehicle Class: ${this.vehicle_class}</p>` : ""}
                ${this.mass ? `<p>Mass: ${this.mass}</p>` : ""}
                ${this.hair_color ? `<p>Hair color: ${this.hair_color}</p>` : ""}
                ${this.skin_color ? `<p>Skin color: ${this.skin_color}</p>` : ""}
                ${this.eye_color ? `<p>Eye color: ${this.eye_color}</p>` : ""}
                ${this.rotation_period ? `<p>Rotation period: ${this.rotation_period}</p>` : ""}
                ${this.orbital_period ? `<p>Orbital period: ${this.orbital_period}</p>` : ""}
                ${this.population ? `<p>Population: ${this.population}</p>` : ""}
                ${this.climate ? `<p>Climate: ${this.climate}</p>` : ""}
                ${this.terrain ? `<p>Terrain: ${this.terrain}</p>` : ""}
                ${this.surface_water ? `<p>Surface water: ${this.surface_water}</p>` : ""}
                ${this.manufacturer ? `<p>Manufacturer: ${this.manufacturer}</p>` : ""}
                ${this.cost_in_credits ? `<p>Cost in credits: ${this.cost_in_credits}</p>` : ""}
                ${this.length ? `<p>Length: ${this.length}</p>` : ""}
                ${this.crew ? `<p>Crew: ${this.crew}</p>` : ""}
                ${this.passengers ? `<p>Passengers: ${this.passengers}</p>` : ""}
                ${this.max_atmosphering_speed ? `<p>Max atmosphering speed: ${this.max_atmosphering_speed}</p>` : ""}
                ${this.cargo_capacity ? `<p>Cargo capacity: ${this.cargo_capacity}</p>` : ""}
                <p>Description: ${this.description}</p>
            </div>
        `;
        modalContent.innerHTML = template;
        return modalContent;
    }

    renderModalContent() {
        let content = this.generateHeroesContent();
        super.buildModal(content);
    }
}
