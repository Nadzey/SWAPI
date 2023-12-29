import { Modal } from "./Modal";

export class HeroesModal extends Modal {
    constructor(classes, data) {
        super(classes);

        this.uid = data.uid;
        this.description = data.description;
        this.name = data.properties.name;
        this.height = data.properties.height;
        this.birth_year = data.properties.birth_year;
        this.diameter = data.properties.diameter;
        this.gravity = data.properties.gravity;
        this.model = data.properties.model;
        this.vehicle_class = data.properties.vehicle_class;
        console.log(data)
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
