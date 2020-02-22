'use strict';
document.addEventListener("DOMContentLoaded", () => {

    const changeSlide = () => {

        const slideInfo = [{
                city: 'Rostov-on-Don LCD admiral',
                area: 81 + 'm<sup>2</sup>',
                time: 3.5 + ' months',
                cost: 'Upon request',
                img: './assets/img/projects/admiral.jpg'

            },
            {
                city: 'Sochi',
                area: 121 + 'm<sup>2</sup>',
                time: 4 + ' months',
                cost: '$ ' + 150000,
                img: './assets/img/projects/thieves.jpg'
            },
            {
                city: 'Rostov-on-Don',
                area: 100 + 'm<sup>2</sup>',
                time: 2 + ' months',
                cost: '$ ' + 120000,
                img: './assets/img/projects/admiral.jpg'
            }
        ];
        const slideDescPart = document.querySelectorAll('.projects__slide-desc-part'),
            slideDescName = [],
            arrows = document.querySelectorAll('.arrow'),
            dots = document.querySelectorAll('.projects__slider-dot'),
            tabs = document.querySelectorAll('.projects__tab-title'),
            tabsLine = document.querySelector('.projects__tab-line')
        let counter = 0;

        getDataAttr(slideDescPart, slideDescName);

        arrows.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                changeSlideDescSubtitle();

                if (counter < slideInfo.length - 1 && e.target.closest('svg').classList.contains('arrow-right')) {
                    counter++;
                } else if (counter == 0 && e.target.closest('svg').classList.contains('arrow-left')) {
                    counter = slideInfo.length - 1;
                } else if (counter > 0 && e.target.closest('svg').classList.contains('arrow-left')) {
                    counter--;
                } else {
                    counter = 0;
                }

            });
        });

        dots.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                changeSlideDescSubtitle();
                counter = elem.dataset.number;
                elem.classList.add('active');
            });
        });

        tabs.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                changeSlideDescSubtitle();
                counter = elem.dataset.number;
            });
        });

        function changeSlideDescSubtitle() {
            const slideDescSubtitle = document.querySelectorAll('.projects__slide-desc--subtitle');

            for (let i = 0; i < slideDescSubtitle.length; i++) {
                const slideImg = document.querySelector('.projects__slide-image img');
                slideDescSubtitle[i].style.opacity = 0;
                slideImg.style.opacity = 0;
                setTimeout(() => {
                    slideDescSubtitle[i].innerHTML = slideInfo[counter][slideDescName[i]];
                    slideImg.src = slideInfo[counter].img;
                    slideDescSubtitle[i].style.opacity = 1;
                    slideImg.style.opacity = 1;

                    document.querySelector('.projects__slider-dot.active').classList.remove('active');
                    dots[counter].classList.add('active');

                    tabsLine.classList.add('active');
                    tabsLine.style.width = tabs[counter].getBoundingClientRect().width + 'px';
                    tabsLine.style.top = tabs[counter].offsetTop + tabs[counter].getBoundingClientRect().height + 10 + 'px';
                    tabsLine.style.left = tabs[counter].getBoundingClientRect().left + 'px';
                }, 300);
            }

        }

        function getDataAttr(el, arr) {
            el.forEach(elem => {
                if (elem != 'img') {
                    arr.push(elem.dataset.name);
                }
            });
        }

    };

    changeSlide();
});