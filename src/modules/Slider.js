export class Slider {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = document.querySelectorAll('.slider__slide');
        this.stripe = document.querySelectorAll('.stripe')
        this.sliderElement = document.querySelector('.slider');
        this.slideImg = document.querySelectorAll('.slider__slide-img')
        this.nextButton = document.querySelector('.slider__btn.next');
        this.prevButton = document.querySelector('.slider__btn.prev');
        this.slideLeft = document.querySelectorAll('.slide-left');
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.totalSlides = this.slides.length;
        this.isAnimationPaused = false;
        this.autoSlideStartTime = 0;
        this.remainingTime = 0;
        
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
        }

        this.showSlide(this.currentSlideIndex);
      
        this.startAutoSlide(7000);

        this.initTouchEvents();

    }

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        if (index >= this.totalSlides) {
            this.currentSlideIndex = 0;
        } else if (index < 0) {
            this.currentSlideIndex = this.totalSlides - 1;
        } else {
            this.currentSlideIndex = index;
        }

        this.slides[this.currentSlideIndex].classList.add('active');

        this.updateStripes();
    }

    pluseSlide(n) {
        this.stopAutoSlide();
    
        const currentSlide = this.slides[this.currentSlideIndex];
        currentSlide.classList.remove('slide-left', 'slide-right');
    
        const newIndex = this.currentSlideIndex + n;
        this.showSlide(newIndex);
    
        const newSlide = this.slides[this.currentSlideIndex];
        const animationClass = n > 0 ? 'slide-left' : 'slide-right';
        newSlide.classList.add(animationClass);
    
        if (!this.isAnimationPaused) {
            this.startAutoSlide(); 
        }
    }
    

    currentSlide(n) {
        this.stopAutoSlide();
        this.showSlide(n);
        this.startAutoSlide();
    }

    startAutoSlide(interval = 7000) {
        clearInterval(this.autoSlideInterval); 
        this.autoSlideStartTime = Date.now(); 
        this.remainingTime = interval;
    
        this.autoSlideInterval = setInterval(() => {
            if (!this.isAnimationPaused) {
                this.pluseSlide(1);
                this.autoSlideStartTime = Date.now(); 
                this.remainingTime = 7000; 
            }
        }, interval);
    }
    
    
    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }

    updateStripes() {
        this.stripe.forEach((stripe, index) => {
            stripe.classList.remove('active-stripe'); 
            if (index === this.currentSlideIndex) {
                stripe.classList.add('active-stripe'); 
            }
        });
    }
    

    initEventListeners() {
        this.nextButton.addEventListener('click', () => this.pluseSlide(1));
        this.prevButton.addEventListener('click', () => this.pluseSlide(-1));
        this.slideImg.forEach(img => {
            img.addEventListener('mouseenter', () => this.pauseAnimation());
            img.addEventListener('mouseleave', () => this.resumeAnimation());
            img.addEventListener('touchstart', () => this.pauseAnimation());
            img.addEventListener('touchend', () => this.resumeAnimation());
        })
    }

    pauseAnimation() {
        if (!this.isAnimationPaused) {
            this.stopAutoSlide();
            this.slideLeft.forEach(slide => slide.style.animationPlayState = 'paused');
            this.stripe.forEach(stripe => stripe.style.animationPlayState = 'paused');
            this.isAnimationPaused = true;
            let currentTime = Date.now();
            this.remainingTime -= currentTime - this.autoSlideStartTime;
        }
    }
    
    resumeAnimation() {
        if (this.isAnimationPaused) {
            this.slideLeft.forEach(slide => slide.style.animationPlayState = 'running');
            this.stripe.forEach(stripe => stripe.style.animationPlayState = 'running');
            this.isAnimationPaused = false; 
            this.autoSlideStartTime = Date.now();
            this.startAutoSlide(this.remainingTime);
        }
    }
    

    initTouchEvents() {
        if (this.sliderElement) {
            this.sliderElement.addEventListener('touchstart', (event) => {
                this.touchStartX = event.changedTouches[0].screenX;
            }, false);

            this.sliderElement.addEventListener('touchend', (event) => {
                this.touchEndX = event.changedTouches[0].screenX;
                this.handleSwipeGesture();
            }, false);
        }
    }

    handleSwipeGesture() {
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (swipeDistance < 50) { 
            this.pluseSlide(1);
        } else if (swipeDistance > -50) { 
            this.pluseSlide(-1);
        }
    }
}
