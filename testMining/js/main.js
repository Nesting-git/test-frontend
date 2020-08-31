
'use strict'

$(document).ready(function () {


    /*общие глобальные переменыне*/
    const $body = $('.js-body');
    const $window = $(window);


    /*попап*/
    function openPopup(id) {
        $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
    }

    function close_popup() {
        $('.js-popup').fadeOut(300);
    }

    $('.js-popup__close').click(close_popup);

    $('.js-btn-popup').click(function (e) {
        e.preventDefault();
        let index_btn_popup = $(this).attr('href');
        openPopup(index_btn_popup);
    });

    $('.js-popup').click(function (e) {
        let popup = $('.js-popup__wrapp');
        if (!popup.is(e.target) && popup.has(e.target).length === 0)
            close_popup();
    });


    /*кнопка прокрутки вверх*/
    const offset = 100;
    const scrollUp = document.querySelector('.js-scroll-up');
    const scrollDop = document.querySelector('.scrollDop');
    const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
    const pathLength = scrollUpSvgPath.getTotalLength();

    scrollUpSvgPath.style.strokeDasharray = pathLength + " " + pathLength;
    scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

    // getTop
    const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

    //updateDashoffset

    const updateDashoffset = () => {
        const heigth = document.documentElement.scrollHeight - window.innerHeight;
        const dashoffset = pathLength - (getTop() * pathLength / heigth);

        scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    }

    // onScroll
    window.addEventListener('scroll', () => {
        updateDashoffset();

        getTop() > offset ? scrollUp.classList.add('scroll-up_active') : scrollUp.classList.remove('scroll-up_active');
    });

    function tops() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // click
    scrollUp.addEventListener('click', tops);
    // document.querySelector('.js-fot-btn').addEventListener('click', tops);

    if ($('a').is('.scrollDop')) {
        scrollDop.addEventListener('click', (e) => {
            e.preventDefault();
            tops();
        });
    }


    /*форма поиска*/
    const $inputSearch = $('.js-input-search');

    $inputSearch.on('focus', function () {
        $(this).closest('.js-header-search').addClass('activeChearch');
    });

    $('.js-search-close').click(function (e) {
        e.preventDefault();
        const $this = $(this);

        $this.closest('.js-header-search').removeClass('activeChearch');
        $this.closest('.js-header-search').find('.js-input-search').val(' ');
    });

    $(document).mouseup(function (e) {
        const divSearch = $('.js-header-search');

        if (!divSearch.is(e.target) && divSearch.has(e.target).length == 0) {
            divSearch.removeClass('activeChearch');
        }
    });


    /*выбор языка*/
    function closeTongue($this) {
        $this.closest('.js-tongue').find('.js-countrys-fall').fadeOut(100);
    }

    $('.js-tongue').hover(
        function () {
            $(this).closest('.js-tongue').find('.js-countrys-fall').fadeIn(100);
        },
        function () {
            closeTongue($(this));
        },
    );

    $('.js-item-countrys').click(function () {
        const $this = $(this);

        $this.closest('.js-tongue').find('.js-flag-icon img').attr('src', $this.attr('data-countrys-img'));
        $this.closest('.js-tongue').find('.js-tongue-country').text($this.text());
        closeTongue($this)
    });


    /*переключение темы*/
    const $switch = $('.js-switch');
    const stringClass = "active-black";
    const $preloader = $('.js-preloader');

    function preloader(statusTopic) {
        if (statusTopic) {
            $preloader.removeClass('preloader_dark');
            $preloader.fadeIn(500);

            setTimeout(function () {
                $body.addClass('body-black');
                $preloader.fadeOut(1000);
            }, 500);
        } else {
            $preloader.addClass('preloader_dark');
            $preloader.fadeIn(500);

            setTimeout(function () {
                $body.removeClass('body-black');
                $preloader.fadeOut(1000);
            }, 500);
        }
    }

    $switch.click(function () {
        if (!$switch.hasClass(stringClass)) {
            $switch.addClass(stringClass);
            preloader(true);
        } else {
            $switch.removeClass(stringClass);
            preloader(false);
        }
    });


    /*главное меню*/
    function menuOpenClose($this, status) {
        if (status) {
            $this.children('.js-sub-menu').fadeIn(10);
        } else {
            $this.children('.js-sub-menu').fadeOut(10);
        }
    }

    $('.js-main-item').hover(
        function () {
            menuOpenClose($(this), true);
        },

        function () {
            menuOpenClose($(this), false);
        },
    );


    /*фиксация меню при прокрутке*/
    const $mainMenu = $('.js-main-menu');
    const menuTop = $mainMenu.offset().top;
    const stringActiveMenu = 'menu-fixed';

    function fixedMenu(scrolle) {
        if (scrolle >= menuTop && !$mainMenu.hasClass(stringActiveMenu)) {
            $mainMenu.addClass(stringActiveMenu);
            let h_Menu = $mainMenu.height();
            $body.css({ 'padding-top': h_Menu + 'px' });
        } else if (scrolle < menuTop && $mainMenu.hasClass(stringActiveMenu)) {
            $mainMenu.removeClass(stringActiveMenu);
            $body.css({ 'padding-top': 0 });
        }
    }


    /*слайдер последние новости*/
    const sliderNew = $('.js-new-slider');
    const asideItem = $('.js-asida-item');

    sliderNew.slick({
        dots: true,
        appendDots: $('.js-latest-slider-dots'),
        appendArrows: $('.js-latest-slider-arrows'),
        speed: 700,
        prevArrow: $('.js-btn-slider-prev'),
        nextArrow: $('.js-btn-slider-next'),
        autoplay: true,
        autoplaySpeed: 5000,
    });

    asideItem.click(function (e) {
        const $this = $(this);

        if (!$this.find('.latest-aside__item--link').is(e.target)) {
            let dataSlid = $this.attr('data-index-slid');

            $this.closest('.latest-aside').find('.js-asida-item').removeClass('active-latest');
            $this.addClass('active-latest');
            sliderNew.slick('slickGoTo', dataSlid);
        }
    });

    sliderNew.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        asideItem.removeClass('active-latest');
        $(".js-asida-item[data-index-slid='" + nextSlide + "'").addClass('active-latest');
    });

    /*читаль далее*/
    let stringBtn = null;

    $('.js-seo-btn').click(function (e) {
        e.preventDefault();
        const $this = $(this);

        if (!$this.hasClass('active-btn')) {
            $this.addClass('active-btn');
            $this.closest('.js-wr-seo').find('.js-dop-text').slideDown(300);

            stringBtn = $this.text();
            $this.text($this.attr('data-btn-text'));
        } else {
            $this.removeClass('active-btn');
            $this.closest('.js-wr-seo').find('.js-dop-text').slideUp(300);
            $this.text(stringBtn);
        }
    });


    /*переключение валюты*/
    $('.js-course-tab').click(function (e) {
        e.preventDefault();
        const $this = $(this);

        if (!$this.hasClass('active')) {
            let attrBtn = $this.attr('data-tab');
            $this.closest('.js-course-currency').find('.js-course-tab').removeClass('active-cur-tab');
            $this.closest('.js-course-currency').find('.js-currency-type').removeClass('active');
            $this.addClass('active-cur-tab');

            $this.closest('.js-course-currency').find('.js-currency-type').each((e, elem) => {
                let $elem = $(elem);

                if ($elem.attr('data-current').indexOf(attrBtn) != -1) {
                    $elem.addClass('active');
                }
            });
        }
    });


    /*слайдер собития криптовалют*/
    const $sliderEvent = $('.js-events-slider');

    $sliderEvent.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.js-events-dots'),
        prevArrow: $('.js-btn-arrow-prev'),
        nextArrow: $('.js-btn-arrow-next'),

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 668,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });


    /*оценка*/
    const $reward = document.querySelectorAll('.js-reward');

    for (let elem of $reward) {
        let path = elem.children[0].children[0]; // получаем дочерный элемента
        let path_lenth = path.getTotalLength(); // получаем длину линии
        let val_app = +elem.lastElementChild.getAttribute('data-appraisal'); // получаем значение оценки с атрибута
        let percent_lenth = path_lenth - ((path_lenth / 10) * val_app);

        path.style.strokeDasharray = (path_lenth - 1) + " " + path_lenth; // нарисуем линию определенной длины со смещением
        path.style.strokeDashoffset = percent_lenth;

        if (val_app == 0) {
            elem.children[0].classList.add('no-appraisal');
        }
    }


    /*мобильное меню*/
    const $bntMobSub = $('.js-btn-sub');
    const $burger = $('.js-burger');
    const $mobMneu = $('.js-mobile-menu');
    const $closeMenu = $('.js-close-menu');

    function closeMenu() {
        $mobMneu.removeClass('active-menus')
    }

    $burger.click(function (e) {
        e.preventDefault();
        $mobMneu.addClass('active-menus');
    });

    $closeMenu.click(closeMenu);

    $mobMneu.mouseup(function (e) {
        if ($mobMneu.has(e.target).length == 0) {
            closeMenu();
        }
    });

    $bntMobSub.click(function () {
        const $ths = $(this);
        const $clos = $ths.closest('.js-wr-li');
        const $child = $clos.children('.js-mob-sub');
        const stringClass = 'active-sub';

        if (!$clos.hasClass(stringClass)) {
            $clos.addClass(stringClass);
            $child.slideDown(300);
        } else {
            $clos.removeClass(stringClass);
            $child.slideUp(300);
        }
    });


    /*перестройка шапки*/
    const d_search = $('.js-header-search');
    const menuContent = $('.js-menu-content');
    const d_autor = $('.header__autoho');
    const d_htext = $('.header__text-info');
    const dop_row = $('.header__dop-row');

    function adaptiveSearch() {
        menuContent.append(d_search);
    }

    function rezAdaptiveSearch() {
        dop_row.prepend(d_search);
    }

    function authorizationMob() {
        menuContent.append(d_autor);
        menuContent.append(d_htext);
    }

    function rezauthorizationMob() {
        dop_row.append(d_autor);
        $('.header__row--left').append(d_htext);
    }


    /*раскрытие пунктов меню футер*/
    const d_menuTitle = $('.footer__item--title');

    d_menuTitle.click(function () {
        const $ths = $(this);
        const $find = $ths.closest('.footer__item').find('.footer__item--list');

        if (!$ths.hasClass('active')) {
            $ths.addClass('active');
            $find.slideDown(300);
        } else {
            $ths.removeClass('active');
            $find.slideUp(300);
        }
    });


    /*боковые категории*/
    const $btnCat = $('.js-btn-subs');

    $btnCat.click(function () {
        const $ths = $(this);
        const $find = $ths.closest('.js-lis').find('.js-categ-sub');

        if (!$ths.hasClass('active')) {
            $ths.addClass('active');
            $find.slideDown(300);
        } else {
            $ths.removeClass('active');
            $find.slideUp(300);
        }
    });


    /*общее событие прокрутки + событи изменение ширины*/
    $(window).on('scroll resize load', function () {
        let scrolls = $(this).scrollTop();
        const w_width = $window.width();

        if (w_width > 992) {
            fixedMenu(scrolls);
        }

        if (w_width <= 992) {
            $mainMenu.removeClass('stringActiveMenu');
            adaptiveSearch();
            $body.css({ 'padding-top': 0 });
        } else {
            rezAdaptiveSearch();
        }

        if (w_width <= 768) {
            authorizationMob();
        } else {
            rezauthorizationMob();
        }
    });

});