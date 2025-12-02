var swiper = new Swiper(".swiper-contact", {
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: false,
    pagination: {
        el: ".pagination-contact",
        clickable: true,
    },
    navigation: {
        clickable: true,
        nextEl: ".sw-pagi-next",
        // prevEl: ".sw-pagi-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        550: {
            slidesPerView: 1.5,
            spaceBetween: 0,
        },
        767: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 2.8,
            spaceBetween: 0,
        },
    },
});