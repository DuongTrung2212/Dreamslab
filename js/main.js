(function ($) {
    "use strict";
    var activeSearchOverlay = function () {
        $(".search-btn, .close-overlay-btn").on("click", function (e) {
            e.stopPropagation();
            if ($(".search-overlay").is(":hidden")) {
                $(".search-overlay").fadeIn(200);
            } else {
                $(".search-overlay").fadeOut(200);
            }
        });

        $(document).on("click", function (e) {
            if (
                $(".search-overlay").is(":visible") &&
                $(e.target).closest(".search-overlay").length === 0
            ) {
                $(".search-overlay").fadeOut(200);
            }
        });
    };

    // var swiper = new Swiper(".mySwiper", {
    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },
    // });

    $(function () {
        activeSearchOverlay();
        new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
            },
        });
    });
})(jQuery);
