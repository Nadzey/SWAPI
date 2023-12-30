export class Slider {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = document.querySelectorAll('.slider__slide');
        this.stripe = document.querySelectorAll('.stripe')
        this.sliderElement = document.querySelector('.slider');
        this.slideImg = document.querySelectorAll('.slider__slide-img')
        this.nextButton = document.querySelector('.slider__btn.next');
        this.prevButton = document.querySelector('.slider__btn.prev');
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.totalSlides = this.slides.length;
        this.isAnimationPaused = false;
        this.autoSlideStartTime = 0;
        this.remainingTime = 0;
        this.autoSlideInterval = null;

       
        this.showSlide(this.currentSlideIndex);

        this.startAutoSlide();

        this.initTouchEvents();
    }

  
    pluseSlide(n) {
        this.stopAutoSlide();
        const newIndex = this.currentSlideIndex + n;
        this.showSlide(newIndex, n > 0 ? 'left' : 'right');
      
        if (!this.isAnimationPaused) {
            this.startAutoSlide(); 
        }
    }
    
    
    showSlide(index,direction) {
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'slide-left', 'slide-right');
            slide.style.animation = '';
        });
    
        if (index >= this.totalSlides) {
            this.currentSlideIndex = 0;
        } else if (index < 0) {
            this.currentSlideIndex = this.totalSlides - 1;
        } else {
            this.currentSlideIndex = index;
        }
    
        const newActiveSlide = this.slides[this.currentSlideIndex];
        newActiveSlide.classList.add('active');
    
        if (!this.isAnimationPaused) {
            if (direction === 'right') {
                newActiveSlide.classList.add('slide-right');
                newActiveSlide.style.animation = 'slideAnimation right 0.7s ease-in-out'; 
            } else {
                newActiveSlide.classList.add('slide-left');
                newActiveSlide.style.animation = 'slideAnimation left 0.7s ease-in-out'; 
            }
        }
    
        this.updateStripes();
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
        const activeSlide = this.sliderElement.querySelector('.active');
        if (activeSlide) {
            activeSlide.classList.remove('slide-left', 'slide-right');
            activeSlide.style.animationPlayState = 'paused';
            this.isAnimationPaused = true;
            let currentTime = Date.now();
            this.remainingTime -= currentTime - this.autoSlideStartTime;
        }
        this.stripe.forEach(stripe => {
            stripe.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimation() {
        const activeSlide = this.sliderElement.querySelector('.active');
        if (activeSlide) {
            activeSlide.style.animationPlayState = 'running';
            this.isAnimationPaused = false;
            this.startAutoSlide(this.remainingTime);
        }
        this.stripe.forEach(stripe => {
            stripe.style.animationPlayState = 'running';
        });
    }
    
    initTouchEvents() {
        if (this.sliderElement) {
            this.sliderElement.addEventListener('touchstart', (event) => {
                this.touchStartX = event.changedTouches[0].screenX;
                this.handleSwipeGesture();
            }, false);

            this.sliderElement.addEventListener('touchend', (event) => {
                this.touchEndX = event.changedTouches[0].screenX;
            }, false);
            
        }
        
    }

    handleSwipeGesture() {
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (swipeDistance < 100) { 
            this.pluseSlide(1);
        } else if (swipeDistance > 100) { 
            this.pluseSlide(-1);
        }
    }
}
