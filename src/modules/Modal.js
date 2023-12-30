export class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modal = '';
        this.modalContent = '';
        this.modalCloseButton = '';
        this.modalOverlay = '';
    }

    buildModal(content) {
        this.modalOverplay = this.createDomeNode(this.modalOverlay, 'div', 'modal__overlay');
        this.modal = this.createDomeNode(this.modal, 'div', 'modal', this.classes);
        this.modalContent = this.createDomeNode(this.modalContent, 'div', 'modal__content');
        this.modalCloseButton = this.createDomeNode(this.modalCloseButton, 'button', 'modal__close-button');
        this.modalCloseButton.textContent = 'Close';
        
        this.setContent(content);

        this.appendModalElements();

        //Bind Events
        this.bindEvents();

        this.openModal();
    }
    createDomeNode (node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    setContent(content) {
        if(typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    }

    appendModalElements() {
        this.modal.appendChild(this.modalContent);
        this.modal.appendChild(this.modalCloseButton);
        this.modalOverplay.appendChild(this.modal);  
    }

    bindEvents () {
        this.modalCloseButton.addEventListener('click',  this.closeModal);
        this.modalOverplay.addEventListener('click',  this.closeModal);
    }

    openModal() {
        document.body.append(this.modalOverplay);

    }

    closeModal(e) {
        let classes = e.target.classList;
        if(classes.contains('modal__close-button') || classes.contains('modal__overlay')) {
            const overlay = document.querySelector('.modal__overlay');
            if (overlay) {
                overlay.remove();
            }
            
        }
    }
}
