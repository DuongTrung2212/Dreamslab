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

    var orbits = function () {
        var $canvas = $("#orbitCanvas");
        var canvas = $canvas[0];
        var ctx = canvas.getContext("2d");

        // luôn resize canvas theo kích thước .orbit-box
        function resizeCanvas() {
            var boxWidth = $canvas.parent().width();
            var boxHeight = $canvas.parent().height();

            canvas.width = boxWidth;
            canvas.height = boxHeight;
        }

        resizeCanvas();
        $(window).on("resize", resizeCanvas);

        // 3 quỹ đạo
        var orbits = [
            { a: 160, b: 30, offsetY: -20, speed: 0.6, phase: 0 },
            { a: 160, b: 35, offsetY: 0, speed: 0.35, phase: 1.2 },
            { a: 160, b: 40, offsetY: 20, speed: 0.22, phase: 2.4 },
        ];

        var lastTime = performance.now();

        function drawEllipse(cx, cy, a, b) {
            ctx.beginPath();
            for (var t = 0; t <= Math.PI * 2 + 0.01; t += 0.02) {
                var x = cx + a * Math.cos(t);
                var y = cy + b * Math.sin(t);
                if (t === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        function animate(now) {
            var dt = (now - lastTime) / 1000;
            lastTime = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var cx = canvas.width / 2;
            var cy = canvas.height / 2;

            // vẽ quỹ đạo
            $.each(orbits, function (i, o) {
                drawEllipse(cx, cy + o.offsetY, o.a, o.b);
            });

            // vẽ các chấm chạy
            $.each(orbits, function (i, o) {
                o.phase += o.speed * dt;

                var x = cx + o.a * Math.cos(o.phase);
                var y = cy + o.b * Math.sin(o.phase) + o.offsetY;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    };

    var activeAccordion = function () {
        // Ẩn tất cả body
        $(".wg-accordion-item .wg-accordion-body").hide();

        $(".wg-accordion-item.active .wg-accordion-body").show();

        // Click event
        $(".wg-accordion-header").on("click", function () {
            var $accordion = $(this).closest(".wg-accordion");
            var $item = $(this).closest(".wg-accordion-item");

            $accordion
                .find(".wg-accordion-item.active")
                .removeClass("active")
                .find(".wg-accordion-body")
                .stop()
                .slideUp(300);

            $item.addClass("active");
            $item.find(".wg-accordion-body").stop().slideDown(300);
        });
    };

    var numberBars = function () {
        $(".numbers-bars").each(function () {
            var $chart = $(this);
            var $bars = $chart.find("[data-value]");

            var values = $bars
                .map(function () {
                    return Number($(this).data("value")) || 0;
                })
                .get();

            var max = Math.max.apply(null, values);

            $bars.each(function () {
                var $el = $(this);
                var v = Number($el.data("value")) || 0;

                var percent = 25 + (v / max) * 75;

                $el.css("height", percent + "%");
            });
        });
    };
    function initSwiper() {
        $(".classic-swiper").each(function (i) {
            var $swiper = $(this);
            var $scope = $swiper.parent();

            var nextBtn = $scope.find(".swiper-btn-next")[0];
            var prevBtn = $scope.find(".swiper-btn-prev")[0];
            var paginationEl = $swiper.find(".swiper-pagination")[0];

            // ----- DEFAULT -----
            var defaultSlidesPerView = 1;
            var defaultSpaceBetween = 0;
            var defaultAutoHeight = false;

            // ----- ĐỌC DATA-ATTRIBUTE (attr cho chắc, khỏi dính camelCase) -----
            var dataSlides = $swiper.attr("data-slides");
            var dataSpace = $swiper.attr("data-space");
            var dataAutoHeight = $swiper.attr("data-auto-height");

            var slidesPerView = dataSlides
                ? parseInt(dataSlides, 10)
                : defaultSlidesPerView;
            var spaceBetween = dataSpace
                ? parseInt(dataSpace, 10)
                : defaultSpaceBetween;

            var autoHeight = defaultAutoHeight;
            if (typeof dataAutoHeight !== "undefined") {
                // chỉ override nếu có data-auto-height
                autoHeight = String(dataAutoHeight).toLowerCase() === "true";
            }

            console.log("swiper", i, {
                slidesPerView,
                spaceBetween,
                autoHeight,
            });

            var navigation = {};
            if (nextBtn) navigation.nextEl = nextBtn;
            if (prevBtn) navigation.prevEl = prevBtn;

            var pagination = paginationEl
                ? {
                      el: paginationEl,
                      clickable: true,
                  }
                : null;

            new Swiper($swiper[0], {
                slidesPerView: slidesPerView,
                spaceBetween: spaceBetween,
                autoHeight: autoHeight,
                ...(Object.keys(navigation).length ? { navigation } : {}),
                ...(pagination ? { pagination } : {}),
            });
        });
    }

    $(function () {
        initSwiper();
        numberBars();
        orbits();
        activeAccordion();
        infiniteSlide();
        dropDownSelected();
        menuToggle();
        loadProduct();
        activeSearchOverlay();
    });
})(jQuery);
