export function smothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

export function renderBurgerMenu() {
    const burgerButton = document.getElementById('burger');
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.header__menu-block a'); 

    if (burgerButton) {
        burgerButton.addEventListener('click', function() {
            header.classList.toggle('open');
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetHref = this.getAttribute('href');

            header.classList.remove('open'); 

            setTimeout(() => {
                window.location.href = targetHref;
            }, 500);
        });
    });
}

