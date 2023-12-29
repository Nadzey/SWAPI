export function smothScroll() {
    document.querySelectorAll('a[href^="#"], a[href^="./index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const isInternalLink = href.startsWith('#');
            const targetId = isInternalLink ? href.substring(1) : href.split('#')[1];

            const path = window.location.pathname;
            if (path.endsWith('index.html') || path === '/' || isInternalLink) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } 
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

