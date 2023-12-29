export class StarWarsCard {
    constructor(data, category) {
        this.uid = data.uid;
        this.name = data.name;
        this.url = data.url;
        this.category = category;
    }

    static loadImages() {
        return require.context('../assets/image/characters', false, /\.(png|jpe?g|svg)$/);
        return require.context('../assets/image/planets', false, /\.(png|jpe?g|svg)$/);
        return require.context('../assets/image/vehicles', false, /\.(png|jpe?g|svg)$/);
    }
    
    getImagePath() {
        const formatImageName = (name) => {
            return name.toLowerCase().replace(/[\s\/]/g, '-').concat('.jpg');
        };
        
        const imageName = formatImageName(this.name);
        return `./img/${imageName}`;
    }
    
    generateCard() {
        let template = '';
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', this.uid);
        card.setAttribute('data-category', this.category);

        const imagePath = this.getImagePath();

        template += `
        <div class="card__image-container">
        <img src="${imagePath}" alt="${this.name}" onerror="this.src='./img/vader.svg'">
        </div>
      `;

      if (this.name || this.url) {
        template += `
            <div class="card__content">
                <h3 class="card__title">${this.name}</h3>
                <p> Click to Learn More</p>
            </div>
        `;
      }
        card.innerHTML = template;
        return card;
    }
}
