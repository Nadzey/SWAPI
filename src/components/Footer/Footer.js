export default class Header {
    constructor() {
        this.element = document.createElement('footer');
    }
   
    render() {
        this.element.innerHTML = `
        <div class="wrapper foooter">
        <div class="footer-rigth">
            <h2>
                Journey Through the Stars. <span style="font-style: italic; font-weight: 600; color: #FFD700; letter-spacing: 0.0176rem;">Explore the Universe of Star Wars.</span>
            </h2>
            <div class="social-media">
                <a href="https://twitter.com/starwars" class="social-link" target="_blank">
                    <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z"/>
                    </svg>
                </a>
                <a href="https://www.instagram.com/starwars/" class="social-link" target="_blank">
                    <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="instagram">
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
                        <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"/>
                        <path d="M17.5 6.51L17.51 6.49889"/>
                        </g>
                    </svg>
                </a>
                <a href="https://www.facebook.com/StarWars/" class="social-link" target="_blank">
                    <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="facebook">
                        <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"/>
                        </g>
                    </svg>
                </a>
            </div>
        </div>
        <div class="footer-left">
            <div class="contacts" id="contacts">
                <div class="contacts_title">
                    <h3>Contact us</h3>
                </div>
                <div class="contacts_items">
                    <div class="contacts_items__item">
                        <a href="https://www.google.com/maps/place/1110+Gorgas+Ave,+San+Francisco,+CA+94123/@37.8013012,-122.4521709,17z/data=!3m1!4b1!4m6!3m5!1s0x8085872a7ef817d5:0x7ed7a9ebebcc0aa0!8m2!3d37.801297!4d-122.449596!16s%2Fg%2F11c5prhdf_?entry=ttu" target="_blank">
                        <svg class="address-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px">
                            <path d="M16.6663 8.33329C16.6663 12.0152 9.99967 18.3333 9.99967 18.3333C9.99967 18.3333 3.33301 12.0152 3.33301 8.33329C3.33301 4.65139 6.31778 1.66663 9.99967 1.66663C13.6816 1.66663 16.6663 4.65139 16.6663 8.33329Z" stroke="#E1D4C9" stroke-width="1.5"/>
                            <path d="M10.0003 9.16667C10.4606 9.16667 10.8337 8.79357 10.8337 8.33333C10.8337 7.8731 10.4606 7.5 10.0003 7.5C9.54009 7.5 9.16699 7.8731 9.16699 8.33333C9.16699 8.79357 9.54009 9.16667 10.0003 9.16667Z" fill="#E1D4C9" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        1110 Gorgas Avenue. San Francisco, CA 94129</a>
                    </div>
                    <div class="contacts_items__item">
                        <a href="tel:+14156231962">
                        <svg class="phone-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px">
                            <g id="phone">
                            <path id="Path" d="M15.0984 12.2516L11.6665 12.9166C9.34845 11.7531 7.91654 10.4166 7.08321 8.33329L7.72483 4.89154L6.51197 1.66663L3.72946 1.66663C2.60191 1.66663 1.71466 2.59958 1.90108 3.71161C2.29888 6.08454 3.37231 10.0391 6.24987 12.9166C9.27338 15.9401 13.5661 17.3318 16.1378 17.9288C17.299 18.1983 18.3332 17.2908 18.3332 16.0988L18.3332 13.4843L15.0984 12.2516Z" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                        +1 (415) 623 1962</a>
                    </div>
                    <div class="contacts_items__item">
                        <a href="https://calendar.google.com" target="_blank">
                            <svg class="calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px">
                                <g id="clock" clip-path="url(#clip0_217_1736)">
                                <path d="M10 5L10 10L15 10" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_217_1736">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            Mon-Sat: 9:00 AM – 23:00 PM
                        </a>
                    </div>
            </div>
        </div>
        </div>
    </div>
        `;
        return this.element;
    }
}


