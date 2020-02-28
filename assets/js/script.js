'use strict';
document.addEventListener("DOMContentLoaded", () => {

    const slider = () => {

        const mq = window.matchMedia("(max-width: 1171px)");

        const adaptiveSlider = () => {
            const sliderRightPart = document.querySelector('.projects__slide--rightPart'),
                sliderImage = sliderRightPart.querySelector('.projects__slide-image'),
                sliderImageClone = sliderImage.cloneNode(true),
                slideDesc = document.querySelector('.projects__slide-desc');

            if (mq.matches) {
                slideDesc.before(sliderImageClone);
            }
        };


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
                tabsLine = document.querySelector('.projects__tab-line'),
                arrowsInCircle = document.querySelectorAll('.projects__slide-arrow');
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

            arrowsInCircle.forEach((elem) => {
                elem.addEventListener('click', (e) => {
                    changeSlideDescSubtitle();

                    if (counter < slideInfo.length - 1 && (e.target.classList.contains('projects__slide-right') || e.target.closest('div').classList.contains('projects__slide-right'))) {
                        counter++;
                    } else if (counter == 0 && (e.target.classList.contains('projects__slide-left') || e.target.closest('div').classList.contains('projects__slide-left'))) {
                        counter = slideInfo.length - 1;
                    } else if (counter > 0 && (e.target.classList.contains('projects__slide-left') || e.target.closest('div').classList.contains('projects__slide-left'))) {
                        counter--;
                    } else {
                        counter = 0;
                    }

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

                        if (tabsLine) {
                            tabsLine.classList.add('active');
                            tabsLine.style.width = tabs[counter].getBoundingClientRect().width + 'px';
                            tabsLine.style.top = tabs[counter].offsetTop + tabs[counter].getBoundingClientRect().height + 10 + 'px';
                            tabsLine.style.left = tabs[counter].getBoundingClientRect().left + 'px';
                        }
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


        adaptiveSlider();
        changeSlide();
    };

    const form = () => {
        const formPopup = document.querySelector('.form-modal'),
            form = document.querySelector('.form'),
            statusMessage = document.querySelector('.form-message'),
            message = {
                succes: 'Yeah! Your application has been sent successfully! Our manager will contact you shortly.',
                failure: 'Oops! Something went wrong, please check the entered data or try again later.'
            },
            input = form.querySelectorAll('input');



        const showAndHideForm = () => {
            const buttons = document.querySelectorAll('.callForm'),
                formClose = document.querySelector('.form-close');

            buttons.forEach(elem => {
                elem.addEventListener('click', () => {
                    formPopup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            formClose.addEventListener('click', () => {
                formPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            formPopup.addEventListener('click', (e) => {
                if (e.target === document.querySelector('.form-wrapper') || e.target === formPopup) {
                    formPopup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        };

        const sendForm = (elem) => {
            elem.addEventListener('submit', e => {
                e.preventDefault();
                let formData = new FormData(elem);

                function postData(data) {
                    return new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();

                        request.open('POST', 'form.php');

                        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                        request.onreadystatechange = () => {
                            if (request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 3) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            }
                        };

                        request.send(data);
                    });
                } // End postData

                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => {
                        statusMessage.classList.add('succes');
                        statusMessage.innerHTML = `<p>${message.succes}</p>`;
                    })
                    .then(() => {
                        setTimeout(() => {
                            formPopup.classList.remove('active');
                            document.body.style.overflow = 'auto';
                            statusMessage.className = 'form-message';
                            statusMessage.innerHTML = '';
                        }, 3000);

                    })
                    .catch(() => {
                        statusMessage.classList.add('failure');
                        statusMessage.innerHTML = `<p>${message.failure}</p>`;
                    })
                    .then(clearInput)
            });
        };


        sendForm(form);
        showAndHideForm();
    };


    slider();
    form();
});