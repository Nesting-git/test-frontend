
'use strict'
$(document).ready(function () {

    // попап
    $('.js-btn-popup').click(function (e) {
        e.preventDefault();
        let index_btn_popup = $(this).attr('href');

        $.each($('.js-popup'), function (i, elem) {
            let index_popup = $(elem).attr('data-id-popup');
            index_btn_popup === index_popup ? $(elem).fadeIn(300) : $(elem).fadeOut(300);
        });
    });

    function close_popup() {
        $('.js-popup').fadeOut(300);
    }

    $('.js-popup__close').click(close_popup);

    $('.js-popup').click(function (e) {
        let popup = $('.js-popup__wrapp');
        if (!popup.is(e.target) && popup.has(e.target).length === 0)
            $('.js-popup').fadeOut(300);
    });

    /* мобильное меню*/

    let $burger = $('.js-btn-burger');
    let $menu = $('.js-main--menu');
    let $btnCloseMenu = $('.js-close-menu');

    $burger.click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $menu.removeClass('active');
        } else {
            $(this).addClass('active');
            $menu.addClass('active');
        }
    });

    $btnCloseMenu.click(function () {
        $burger.removeClass('active');
        $menu.removeClass('active');
    });

    /* главный слайдер*/

    $('.js-main-slider').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
    });

    /*слайдеры для блока защита*/

    $('.js-slider-protection').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '10px',
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.products-item-slider').each(function (e) {
        $(this).slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            appendDots: $(this).closest('.products-item').find('.js-slider-bot'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    });



    //смена каталога продукции

    $('.js-slider-protection').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        let itemString = $(this).find('.js-protection-item.slick-current.slick-active.slick-center').attr('data-protection');

        let $slickCenter = $('.js-protection-item.slick-current.slick-active.slick-center');

        $('.js-protection-item').removeClass('activeScale');

        $slickCenter.next().addClass('activeScale');
        $slickCenter.prev().addClass('activeScale');

        $('.js-protection-products__items').each(function (e, elem) {

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }

            if (itemString.indexOf($(elem).attr('data-protection-item')) != -1) {
                $('.js-protection-products__items').fadeOut(1);
                $(elem).fadeIn(1);
                $('.products-item-slider').each(function (e, elem) {
                    $(elem).slick('unslick');
                    $(elem).slick('init');
                });
            }
        });
    });

    /*фильтер для слайдера*/

    $('.js-pro-item-tab').click(function (e) {
        let filterString = $(this).attr('data-filter'); // получение атрибута с кнопки

        if (!$(this).hasClass('active')) {
            $(this).closest('.products-item__tabs').find('.js-pro-item-tab').removeClass('active');
            $(this).addClass('active');
        }

        if (filterString.indexOf('all') == -1) {
            $('.products-item-slider').slick('slickUnfilter'); //Удаление примененных фильтров
            $('.products-item-slider').slick('slickFilter', '[data-item-slider="' + filterString + '"]'); // фильтрация по атрбуту
        } else {
            $('.products-item-slider').slick('slickUnfilter'); //Удаление примененных фильтров
        }
    });

    /*Эфект баян*/
    $('.js-question-item-main').click(function () {
        if (!$(this).closest('.js-question-item').hasClass('active')) {
            $(this).closest('.js-question-item').addClass('active');
            $(this).closest('.js-question-item').find('.section-question__item--content').slideDown(300);
        } else {
            $(this).closest('.js-question-item').removeClass('active');
            $(this).closest('.js-question-item').find('.section-question__item--content').slideUp(300);
        }
    });

    /*фильтер страница каталог*/
    $('.js-filter__item').click(function () {
        if (!$(this).closest('.js-catalog-article-item').hasClass('active')) {
            $(this).closest('.js-catalog-article-item').addClass('active');
            $(this).closest('.js-catalog-article-item').find('.catalog-article__item--content').slideDown(300);
        } else {
            $(this).closest('.js-catalog-article-item').removeClass('active');
            $(this).closest('.js-catalog-article-item').find('.catalog-article__item--content').slideUp(300);
        }
    });

    $('.row-filter-dop__main').click(function () {
        if (!$(this).closest('.row-filter-dop').hasClass('actives')) {
            $(this).closest('.row-filter-dop').addClass('actives');
            $(this).closest('.row-filter-dop').find('.row-filter-dop__container').slideDown(300);
        } else {
            $(this).closest('.row-filter-dop').removeClass('actives');
            $(this).closest('.row-filter-dop').find('.row-filter-dop__container').slideUp(300);
        }
    });

    $('.js-reset-filter').click(function () {
        $('.js-form-filter').find('input').prop('checked', false);
    });

    /*меню фильтры на моб.*/

    function closeFilter() {
        $('.js-btn-mob-filter').removeClass('active');
        $('.js-catalog-article').removeClass('active');
    }

    $(document).mouseup(function (e) {
        let $filter = $('.js-catalog-article');

        if (!$filter.is(e.target) && $filter.has(e.target).length === 0 && $('.js-catalog-article').hasClass('active')) {
            closeFilter();
        }
    });

    $('.js-btn-mob-filter').click(function (e) {
        e.preventDefault();

        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.js-catalog-article').addClass('active');
        } else {
            closeFilter();
        }
    });

    $('.js-btn-filter-close').click(function (e) {
        e.preventDefault();
        closeFilter();
    });

    /*табы страница продукта*/
    $('.js-item-tab').click(function () {
        if (!$(this).hasClass('active')) {
            $('.js-item-tab').removeClass('active');
            $(this).addClass('active');

            let attrString = $(this).attr('data-filter');
            let $itemDiv$ = $('.js-product-charac-item');

            $itemDiv$.removeClass('active');
            $itemDiv$.fadeOut(1);

            $itemDiv$.each(function () {
                if ($(this).attr('data-charac-item').indexOf(attrString) != -1) {
                    $(this).fadeIn(1);
                }
            });
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() <= 768) {
            $('.section-product__row').prepend($('.section-product__title'));
        } else {
            $('.section-product__info--logo').before().prepend($('.section-product__title'));
        }
    });

    $('.section-question__item_dop').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.section-question__items--dop').slideDown(300);
        } else {
            $(this).removeClass('active');
            $('.section-question__items--dop').slideUp(300);
        }
    });

    /*валидация*/

    let regular_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    $('.js-form-consultation button[type="submit"]').click(function (e) {
        let erroForm = false;

        let regular_name = /^[A-Z]{1}[a-z]{1,15}$|(^[А-Я-ЁЇІЄҐ]{1}[а-я-яёїієґ]{1,15}?$)/;
        let $name = $(this).closest('.js-form-consultation').find('input[name = "name"]');

        if ($name.length > 0) {
            if (!regular_name.test($name.val())) {
                $name.addClass('error');
            } else {
                $name.removeClass('error');
            }
        }

        let $phone = $(this).closest('.js-form-consultation').find('input[name = "phone"]');

        if ($phone.length > 0) {
            if ($phone.val().length < 6) {
                $phone.addClass('error');
            } else {
                $phone.removeClass('error');
            }
        }


        let $email = $(this).closest('.js-form-consultation').find('input[name = "email"]');

        if ($email.length > 0) {
            if (!regular_email.test($email.val())) {
                $email.addClass('error');
            } else {
                $email.removeClass('error');
            }
        }

        $(this).closest('.js-form-consultation').find('input').each(function () {
            if ($(this).hasClass('error')) {
                erroForm = true;
            } else {
                erroForm = false;
            }
        });

        if (erroForm == true) {
            e.preventDefault();
        }

    });

    (function () {

        let regular_fio = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*){2}$/;
        let $fio = $('.js-form-quest').find('input[name = "fio"]');

        $fio.on('input', function () {

            if ($fio.length > 0) {
                if (!regular_fio.test($fio.val())) {
                    $fio.addClass('error');
                    $fio.closest('.js-fotm-item').removeClass('next-active');
                } else {
                    $fio.removeClass('error');
                    $fio.closest('.js-fotm-item').addClass('next-active');

                    $fio.closest('.js-fotm-item').next('.js-fotm-item').addClass('active');
                    $fio.closest('.js-fotm-item').next('.js-fotm-item').find('input').prop('disabled', false);
                }
            }
        });

        let $phone = $('.js-form-quest').find('input[name = "phone"]');

        $phone.on('input', function () {

            if ($phone.length > 0) {
                console.log(1);
                if ($phone.val().length < 6) {
                    $phone.addClass('error');
                } else {
                    $phone.removeClass('error');
                }
            }

            $('.js-form-quest').find('.js-fotm-item').addClass('active');
            $('.js-form-quest').find('.js-fotm-item').find('input').prop('disabled', false);
            $('.js-form-quest').find('.js-fotm-item').find('select').prop('disabled', false);

        });


        let $email = $('.js-form-quest').find('input[name = "email"]');

        $email.on('input', function () {

            if ($email.length > 0) {
                if (!regular_email.test($email.val())) {
                    $email.addClass('error');
                } else {
                    $email.removeClass('error');
                }
            }
        });



    })();

});

/*кнопка прокрутки вверх*/

const offset = 100;
const scrollUp = document.querySelector('.js-scroll-up');
const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
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

// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

/*скрол по якорю*/