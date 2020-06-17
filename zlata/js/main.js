
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
    // end Прокрутка вверх

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
    // end попап




    // sliders
    $('.sliderbig').slick({
        arrows: false,
        fade: true,
        asNavFor: ".slider-product",
    });

    $('.slider-product').slick({
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".sliderbig",
        focusOnSelect: true,
    });

    $('.slider-insta').slick({
        arrows: false,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive:[
            {
                breakpoint: 1160,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    }
            },
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    }
            },
            {
                breakpoint: 600,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    }
            },
        ]
    });

    $('.slider-summer').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $('.slider-shop').slick({
        arrows: false,
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive:[
            {
                breakpoint: 1080,
                settings:{
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    }
            },
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    }
            },
            {
                breakpoint: 650,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    }
            },
            {
                breakpoint: 440,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    }
            },
        ]
    });

    $('.slider-stones').slick({
        arrows: true,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive:[
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 4,
                    }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings:{
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400,
                settings:{
                    slidesToShow: 1,
                }
            },
        ]   
    });

    $('.slider-new').slick({
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.new__navbar',
        draggable: false,
    });

    $('.new__navbar').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-new',
        focusOnSelect: true,
        arrows: false,
        responsive:[
            {
                breakpoint: 600,
                settings:{
                    vertical: true,
                    variableWidth: true,
                }
            },
        ]
    });

    $('.mega-item').slick({
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive:[
            {
                breakpoint: 1260,
                settings:{
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings:{
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.new__navbar').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.new__li').removeClass('active');
        $('.new__navbar').find('.slick-current.slick-active').addClass('active');

        let text = $('.new__navbar').find('.slick-current.slick-active .new__link').text();
        let textLink = $('.new__navbar').find('.slick-current.slick-active .new__link').attr('data-txt');

        $('#new-title').text(text);
        $('.js-all-stones').text(textLink);
    });

    $('.arrow-right').click(function () {
        $('.mega-item').slick('slickNext');
    });
    $('.arrow-left').click(function () {
        $('.mega-item').slick('slickPrev');
    });

    let select = function() {
        let selectItem = document.querySelectorAll('.select__item');
    
        selectItem.forEach( item => {
            item.addEventListener('click', selectChoose)
        });

        function selectChoose(){
            let text = this.innerText;
            let currentText = this.closest('.topmenu').querySelector('.select-region');
            currentText.innerText = text;
        }
    }

    select();

    /* load more */
    
    $(function(){
        $(".wrapper-slice").slice(0, 5).show();
        $(".link-all").on('click', function(e){
            $(".wrapper-slice:hidden").slice(0, 10).slideDown();
            if ($(".wrapper-slice:hidden").length == 0) {
                $(".wrapper-all").addClass('hide');
            }
        })
    });

    /* load more end*/

    /* burger */
    $(document).ready(function() {
        $('.header__burger').click(function(event) {
            $('.header__burger,.header__menu').toggleClass('active');
            $('body').toggleClass('lock');
        });
    });
    /* burger end*/

    /* footer slide */
    $(".footer__title").click(function (e) {
        // e.preventDefault();
        e = $(this).closest('.footer__item').find('.wrapper-list');

        if (!e.is(':visible')) {
          e.slideDown();
          
        }
        else {
          e.slideUp();
        }
    });
    /* footer slide end*/
    $(".mob-menu").click(function (e) {
        e.preventDefault();
        e = $(".mob-list");
        
        if (!e.is(':visible')) {
          e.slideDown();  
          $(".mob-menu").text("Скрыть меню");
        }
        else {
          e.slideUp();
          $(".mob-menu").text("Меню");
        }   
     });


     
    let mql = window.matchMedia('all and (max-width: 900px)');
    if (mql.matches) {
        // Перемещаем параграф из product__title в mob-title
    $('.mob-title').append( $('.product__title') );
    } else {
        // нет, размер окна более 479px 
    }
    



});