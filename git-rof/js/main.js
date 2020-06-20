
'use strict'
$(document).ready(function () {

    // ibg
    function ibg() {
        $.each($('.ibg'), function (index, val) {
            if ($(this).find('img').length > 0) {
                let src_img = $(this).find('img').attr('src');
                $(this).css('backgroundImage', 'url("' + src_img + '")');
            }
        });
    }
    ibg();
    // end ibg

    // Прокрутка вверх
    $(window).scroll(function () {
        let scr_top = $(window).scrollTop();
        scr_top > 100 ? $('.js-up').fadeIn(300) : $('.js-up').fadeOut(300);
    });
    $('.js-up').click(function () {
        $('html, boud').animate({ scrollTop: 0 }, 300);
    });

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

    // меню пк

    $('.header__menu--li').on('mouseover', function () {
        $(this).find('.js-sub-menu').addClass('active');
    });

    $('.header__menu--li').on('mouseout', function () {
        $('.js-sub-menu').removeClass('active');
    });

    let breackEach = false;

    function indexSubMenu(elem) {
        let $id_sub = $('.js-id-item');
        $id_sub.removeClass('active');
        breackEach = false;

        $id_sub.each(function (e, elems) {
            if (breackEach == false) {
                if (elem.attr('data-btn-item') == $(elems).attr('data-id-item')) {
                    $(elems).addClass('active');
                    breackEach = true;
                }
            }
        });
    }

    $('.js-item-btn').on('mouseover', function () {
        $('.js-item-btn').removeClass('active');
        $(this).addClass('active');
        indexSubMenu($(this));
    });

    // главный слайдер 

    // 8000 скорость смены слайдера
    function banerLineStart() {
        $('.js-baner-line').stop(true, true);
        $('.js-baner-line').css('width', '0px');

        $('.js-baner-line').animate({
            width: '100%',
        }, 8000, function () {
            $('.main-slider .slick-next').trigger('click');
        });
    }

    $('.js-main-slider').slick({
        lazyLoad: 'progressive',
        speed: 800,
    });

    banerLineStart();

    $('.js-main-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        banerLineStart();
    });

    // боковое меню 
    $('.js-btn-sub').click(function () {
        if (!$(this).closest('.js-list-item').hasClass('no-open')) {
            $(this).closest('.js-list-item').addClass('no-open');

            $(this).closest('.js-list-item').find('.js-sub-list:first').slideDown(200);

        } else {
            $(this).closest('.js-list-item').removeClass('no-open');
            $(this).closest('.js-list-item').find('.js-sub-list:first').slideUp(200);
        }
    });

    let cosAsid = true;
    let posAsideSatic = 0;
    let PosStatTop = 0;
    let consts = true;
    let h_footer = 0; // высота футера

    function posAsideMenu() {

        let $aside = $('.js-aside-menu');
        let scroll_top = $(window).scrollTop();
        let pos_d = $aside.offset().top;
        let h_d = $aside.height();
        let h_w = $(window).height();
        let H_top = 0;
        let difference = 0;

        let posFotMenu = $('.pos-menu').offset().top;

        if ($('.js-info-top').length > 0) {
            let $h_i = $('.js-info-top');
            H_top = $h_i.outerHeight();
            H_top -= 20;
            H_top *= -1;
        } else {
            H_top = 20;
        }

        if (cosAsid == true) {
            posAsideSatic = pos_d;
            h_footer = $('.footer').outerHeight(); // при загрузке страницы записывается высота футера
            cosAsid = false;
        }

        if (scroll_top < posAsideSatic) {
            $aside.css({
                'marginTop': H_top + 'px',
                'top': '0',
                'position': 'absolute',
            });
        } else {
            $aside.css({
                'marginTop': '0px',
                'position': 'fixed',
            });
            if (h_d > h_w) {
                if (scrollDir(scroll_top)) {
                    // когда крутим вниз
                    difference = ((h_d - h_w) + 30) * -1;

                    if (consts == true) {
                        PosStatTop = scroll_top;
                        consts = false;
                    }

                    let dd = (scroll_top - PosStatTop) * -1;
                   
                    if (dd >= difference) {
                        $aside.css({
                            'top': dd + 'px',
                        });
                    } else if ((scroll_top + $(window).height()) >= posFotMenu) {

                        $aside.css({
                            'top': '-940px',
                        });
                    }
                } else {
                    // когда крутим верх
                    difference = ((h_d - h_w) + 30);

                    if (consts == false) {
                        PosStatTop = scroll_top;
                        consts = true;
                    }

                    let bb = (PosStatTop - (scroll_top + difference))

                    if (bb <= 0) {
                        $aside.css({
                            'top': bb + 'px',
                        });
                    } else {
                        $aside.css({
                            'top': '20px',
                        });
                    }
                }
            }
        }
    }

    let scrollDirection = 0;
    function scrollDir(scroll_top) {
        if (scroll_top > scrollDirection) {
            // крутим вниз
            scrollDirection = scroll_top;
            return true;
        } else {
            // крутим верх
            scrollDirection = scroll_top;
            return false;
        }
    }

    $(window).on('scroll load resize', function () {
        if ($(window).width() > 1024) {
            if ($('.js-aside-menu').length > 0) {
                posAsideMenu();
            }
        } else {
            $('.pos-menu').append($('.js-aside-mob'));
        }
    });

    // движение картинки

    $(function () {

        $('.js-simple').mousemove(function (e) {
            let offset = $(this).offset();
            let r_x = (e.pageX - offset.left);
            let r_y = (e.pageY - offset.top);

            r_x = (r_x * 1.5) * -1;
            r_y = (r_y * 1.5) * -1;

            $(this).find('.js-img-scale').css({
                "top": r_y + 'px',
                "left": r_x + 'px',
            })

        });
    });

    // слайдер популярные кровельные материалы

    $('.js-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.slider-btn-2-prev'),
        nextArrow: $('.slider-btn-2-next'),
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    // слайдер для отзывов

    $('.js-reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
    });

    // маска телефона
    $('.js-phone').mask("+ 375 (99) ___-__-__");

    // добавление снизу падингов для страницы высотой с футер

    function footerFixed() {
        let h_f = $('.js-footer').outerHeight();
        h_f -= 2;
        $('.js-wrapper').css('margin-bottom', h_f + 'px');
    }


    $(window).on('resize load', function () {
        if ($(window).width() > 768) {
            footerFixed();
        }
    });

    //wow
    if ($(window).width() > 768) {
        new WOW().init();
    }

    // мобильное меню

    function closeMobMenu() {
        $('.js-btm-burger').removeClass('active');
        $('.js-wr-mob-menu').removeClass('active');
        $('body').removeClass('body-hiden');
    }

    $('.js-btm-burger').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.js-wr-mob-menu').addClass('active');
            $('body').addClass('body-hiden');
        } else {
            closeMobMenu();
        }
    });


    $('.mob-menu-close').click(function () {
        closeMobMenu();
    });

    $('.js-wr-mob-menu').click(function (e) {
        if ($(this).is(e.target)) {
            closeMobMenu();
        }
    })

    $('.js-btn-sub-menu').click(function () {
        if (!$(this).closest('.js-close-sub').hasClass('open')) {
            $(this).addClass('active');
            $(this).closest('.js-close-sub').addClass('open');
            $(this).closest('.js-close-sub').find('.js-item-sub:first').slideDown(200);
        } else {
            $(this).removeClass('active');
            $(this).closest('.js-close-sub').removeClass('open');
            $(this).closest('.js-close-sub').find('.js-item-sub:first').slideUp(200);
        }
    });

    // filter categories
    $('.js-btn-filter').click(function (e) {
        e.preventDefault();
        let ths = $(this);
        if (!ths.hasClass('active')) {

            $('.js-btn-filter').removeClass('active');
            ths.addClass('active');

            if (ths.attr('data-filter') == "*") {
                $('.js-post-category').fadeIn('300');
            } else {
                $('.js-post-category').fadeOut(3);
                $('.js-post-category').each(function (e, elem) {
                    if (ths.attr('data-filter') == $(elem).attr('data-post')) {
                        $(elem).fadeIn(300);
                    }
                });
            }


        }
    });

    // ХАРАКТЕРИСТИКИ ПОКРЫТИЙ И ЦВЕТА НА АКЦИИ

    $('.js-otsvka__tab').click(function (e) {
        e.preventDefault();

        let $this = $(this);

        if (!$(this).hasClass('active')) {
            $(this).closest('.js-wr-otsvka').find('.js-otsvka__tab').removeClass('active');
            $(this).closest('.js-wr-otsvka').find('.js-content-otsvka__item').removeClass('active');
            $(this).addClass('active');
        }

        $(this).closest('.js-wr-otsvka').find('.js-content-otsvka__item').each(function (e, elem) {
            if ($this.attr('data-btn-otsvka') == $(elem).attr('data-content-otsvka')) {
                $(elem).addClass('active');
            }
        });
    });

    $('.js-panel-tab').click(function (e) {
        e.preventDefault();

        let $this = $(this);

        if (!$(this).hasClass('active')) {
            $(this).closest('.js-wr-panel').find('.js-panel-tab').removeClass('active');
            $(this).closest('.js-wr-panel').find('.js-item-panel').removeClass('active');
            $(this).addClass('active');

            $this.closest('.js-wr-panel').find('.js-item-panel').each(function (e, elem) {
                if ($this.attr('data-pa-btn') == $(elem).attr('data-panel')) {
                    $(elem).addClass('active');
                }
            });
        }
    });

    // слайдер на странице подробнее

    $('.js-more-slide-vertical').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        prevArrow: $('.btn-vert-prev'),
        nextArrow: $('.btn-vert-next'),
        focusOnSelect: true,
        asNavFor: '.js-more-slide',
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                }
            },
        ]
    });

    $('.js-more-slide').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('.btn-more-prev'),
        nextArrow: $('.btn-more-next'),
        fade: true,
        asNavFor: '.js-more-slide-vertical',
    });

});