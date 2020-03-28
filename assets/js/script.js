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
        const formModal = document.querySelector('.form-modal'),
            popupForm = document.querySelector('.popup-form'),
            popupFormStatusMessage = formModal.querySelector('.form-message'),
            message = {
                succes: 'Yeah! Your application has been sent successfully! Our manager will contact you shortly.',
                failure: 'Oops! Something went wrong, please check the entered data or try again later.'
            },
            controlForm = document.querySelector('.control-form'),
            controlFormStatusMessage = document.querySelector('.control-form-message'),
            advantagesForm = document.querySelector('.advantages-form'),
            advantagesFormMessage = document.querySelector('.advantages-form-message');



        const showAndHideForm = () => {
            const buttons = document.querySelectorAll('.callForm'),
                formClose = document.querySelector('.form-close');

            buttons.forEach(elem => {
                elem.addEventListener('click', () => {
                    formModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            formClose.addEventListener('click', () => {
                formModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            formModal.addEventListener('click', (e) => {
                if (e.target === document.querySelector('.form-wrapper') || e.target === formModal) {
                    formModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        };

        const sendForm = (elem, messageBlock) => {
            elem.addEventListener('submit', e => {
                e.preventDefault();
                let formData = new FormData(elem);

                function postData(data, messageBlock) {
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
                    const input = elem.querySelectorAll('input');
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => {
                        messageBlock.classList.add('succes');
                        messageBlock.innerHTML = `<p>${message.succes}</p>`;
                    })
                    .then(() => {
                        setTimeout(() => {
                            if (elem.closest('.form-modal')) {
                                elem.closest('.form-modal').classList.remove('active');
                            }
                            document.body.style.overflow = 'auto';
                            messageBlock.classList.remove('succes');
                            messageBlock.innerHTML = '';
                        }, 3000);

                    })
                    .catch(() => {
                        messageBlock.classList.add('failure');
                        messageBlock.innerHTML = `<p>${message.failure}</p>`;
                        setTimeout(() => {
                            if (elem.closest('.form-modal')) {
                                elem.closest('.form-modal').classList.remove('active');
                            }
                            document.body.style.overflow = 'auto';
                            messageBlock.classList.remove('failure');
                            messageBlock.innerHTML = '';
                        }, 3000);
                    })
                    .then(clearInput)
            });
        };


        sendForm(popupForm, popupFormStatusMessage);
        sendForm(controlForm, controlFormStatusMessage);
        sendForm(advantagesForm, advantagesFormMessage);
        showAndHideForm();
    };

    const video = () => {
        const video = document.querySelector('.control__video video'),
            playBtn = document.querySelector('.control__video-play'),
            volumeIcon = document.querySelector('.control__video-volume svg'),
            volumeRange = document.querySelector('.control__video-volume-range'),
            volumeRangeInput = volumeRange.querySelector('#volume'),
            controls = document.querySelector('.control__video-controls');

        video.addEventListener('canplaythrough', () => {
            controls.classList.remove('hidden');
            video.volume = volumeRangeInput.value;
        });

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = ' <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M181.333,0H74.667c-17.643,0-32,14.357-32,32v448c0,17.643,14.357,32,32,32h106.667c17.643,0,32-14.357,32-32V32 C213.333,14.357,198.976,0,181.333,0z" fill="white"/> <path d="M437.333,0H330.667c-17.643,0-32,14.357-32,32v448c0,17.643,14.357,32,32,32h106.667c17.643,0,32-14.357,32-32V32 C469.333,14.357,454.976,0,437.333,0z" fill="white"/> </svg>';
                playBtn.classList.add('hidden');
            } else {
                video.pause();
                playBtn.innerHTML = '<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 13L7.65417e-07 25.1244L1.82536e-06 0.875644L21 13Z" fill="white" /></svg>';
                playBtn.classList.remove('hidden');
            }
        });

        volumeIcon.addEventListener('click', () => {
            volumeRange.classList.toggle('hidden');
        });

        volumeRangeInput.addEventListener('input', () => {
            video.volume = volumeRangeInput.value;
        });

        video.addEventListener('ended', () => {
            video.currentTime = 0;
            playBtn.innerHTML = '<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 13L7.65417e-07 25.1244L1.82536e-06 0.875644L21 13Z" fill="white" /></svg>';
        });
    };

    const tabs = () => {
        const links = document.querySelectorAll('.repair__list-item'),
            images = document.querySelectorAll('.repair-rightPart img'),
            imagesSrc = [
                [
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/flower.jpg"
                ],
                [
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/couch.jpg"
                ],
                [
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/room.jpg"
                ],
                [
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/сlock.jpg"
                ],
                [
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/couch.jpg"
                ],
                [
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/flower.jpg"
                ],
                [
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/flower.jpg"
                ],
                [
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/couch.jpg"
                ],
                [
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/room.jpg"
                ],
                [
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/сlock.jpg"
                ],
                [
                    "./assets/img/repairs/сlock.jpg",
                    "./assets/img/repairs/couch.jpg",
                    "./assets/img/repairs/room.jpg",
                    "./assets/img/repairs/flower.jpg",
                    "./assets/img/repairs/couch.jpg"
                ]
            ];

        links.forEach((link, number) => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('active')) {
                    document.querySelector('.repair__list-item.active').classList.remove('active');
                    link.classList.add('active');
                    images.forEach((img, i) => {
                        img.style.opacity = 0;
                        setTimeout(() => {
                            img.src = imagesSrc[number][i];
                        }, 450)
                        setTimeout(() => {
                            img.style.opacity = 1;
                        }, 650)
                    })
                }
            })
        })
    }

    slider();
    video();
    form();
    tabs();
});