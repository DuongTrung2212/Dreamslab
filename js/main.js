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
    var loadProduct = function () {
        const gridInitialItems = 6;
        const listInitialItems = 3;
        const gridItemsPerPage = 3;
        const listItemsPerPage = 2;

        let listItemsDisplayed = listInitialItems;
        let gridItemsDisplayed = gridInitialItems;
        let scrollTimeout;

        function hideExtraItems(layout, itemsDisplayed) {
            layout.find(".loadItem").each(function (index) {
                if (index >= itemsDisplayed) {
                    $(this).addClass("hidden");
                }
            });
            if (layout.is("#listLayout")) updateLastVisible(layout);
        }

        function showMoreItems(layout, itemsPerPage, itemsDisplayed) {
            const hiddenItems = layout.find(".loadItem.hidden");

            setTimeout(function () {
                hiddenItems.slice(0, itemsPerPage).removeClass("hidden");
                if (layout.is("#listLayout")) updateLastVisible(layout);
                checkLoadMoreButton(layout);
            }, 600);

            return itemsDisplayed + itemsPerPage;
        }

        function updateLastVisible(layout) {
            layout.find(".loadItem").removeClass("last-visible");
            layout
                .find(".loadItem")
                .not(".hidden")
                .last()
                .addClass("last-visible");
        }
        function checkLoadMoreButton(layout) {
            if (layout.find(".loadItem.hidden").length === 0) {
                if (layout.is("#listLayout")) {
                    $("#loadMoreListBtn").hide();
                    $("#infiniteScrollList").hide();
                } else if (layout.is("#gridLayout")) {
                    $("#loadMoreGridBtn").hide();
                    $("#infiniteScrollGrid").hide();
                }
            }
        }

        hideExtraItems($("#listLayout"), listItemsDisplayed);
        hideExtraItems($("#gridLayout"), gridItemsDisplayed);

        $("#loadMoreListBtn").on("click", function () {
            listItemsDisplayed = showMoreItems(
                $("#listLayout"),
                listItemsPerPage,
                listItemsDisplayed
            );
        });

        $("#loadMoreGridBtn").on("click", function () {
            gridItemsDisplayed = showMoreItems(
                $("#gridLayout"),
                gridItemsPerPage,
                gridItemsDisplayed
            );
        });

        // Infinite Scrolling
        function onScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () {
                const infiniteScrollList = $("#infiniteScrollList");
                const infiniteScrollGrid = $("#infiniteScrollGrid");

                if (
                    infiniteScrollList.is(":visible") &&
                    isElementInViewport(infiniteScrollList)
                ) {
                    listItemsDisplayed = showMoreItems(
                        $("#listLayout"),
                        listItemsPerPage,
                        listItemsDisplayed
                    );
                }

                if (
                    infiniteScrollGrid.is(":visible") &&
                    isElementInViewport(infiniteScrollGrid)
                ) {
                    gridItemsDisplayed = showMoreItems(
                        $("#gridLayout"),
                        gridItemsPerPage,
                        gridItemsDisplayed
                    );
                }
            }, 300);
        }
        function isElementInViewport(el) {
            const rect = el[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    (window.innerHeight ||
                        document.documentElement.clientHeight) &&
                rect.right <=
                    (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        $(window).on("scroll", onScroll);
    };
    var dropDownSelected = function () {
        $(".dropdown-item").on("click", function () {
            const selectedText = $(this).text().trim();
            $(".dropdown-toggle").text(selectedText);

            // đóng dropdown
            const dropdown = bootstrap.Dropdown.getInstance(
                $(".dropdown-toggle")[0]
            );
            dropdown.hide();
        });
    };

    var menuToggle = function () {
        const $toggleBtn = $(".menu-toggle span");
        const $menuList = $(".menu-list");

        $toggleBtn.addClass("icon-animate");

        $toggleBtn.on("click", function () {
            const $icon = $(this);

            if ($menuList.hasClass("d-none")) {
                $menuList
                    .removeClass("d-none")
                    .hide()
                    .slideDown(300, function () {
                        $(this).css("display", "flex");
                    });
            } else {
                $menuList.slideUp(300, function () {
                    $(this).addClass("d-none");
                });
            }

            $icon.toggleClass("icon-menuhome icon-close");

            $icon.toggleClass("open");
        });
    };

    /* Infinite Slide
  ----------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        $(".infiniteslide").each(function () {
            var $this = $(this);
            var style = $this.data("style") || "left";
            var clone = parseInt($this.data("clone")) || 2;
            var speed = parseInt($this.data("speed")) || 100;

            if ($("body").hasClass("rtl")) {
                style = style === "left" ? "right" : "left";
            }

            $this.infiniteslide({
                speed: speed,
                direction: style,
                clone: clone,
            });
        });
    };

    $(function () {
        infiniteSlide();
        dropDownSelected();
        menuToggle();
        loadProduct();
        activeSearchOverlay();
        new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
            },
        });
    });
})(jQuery);
