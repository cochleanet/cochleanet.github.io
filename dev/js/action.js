$(document).ready(function () {
    $("#CloseWeWorkBanner").on("click", function () {
        $("#WeWorkBanner").removeClass("showPhBanner")
    }), $(".mob_conetnt").hide(), $("#ClosePhBanner").on("click", function () {
        $("#PhBanner").removeClass("showPhBanner")
    }), $("#CloseCookies").on("click", function () {
        $("#CookiesBanner").removeClass("showPhBanner")
    }), $("#intro").addClass("MacInterFace"), $(".Win").hide(),
    "Win32" == navigator.platform && (window.productHuntUpcoming = {
        appId: 14902,
        position: "bottomLeft"
    },
        $("a.Mob").on("click", function (e) {
            $("#mobile-sub").addClass("open"), $(".general-btn a.Win").attr({
                href: "javascript:void(0)",
                target: ""
            })
        }), $("#mobile-sub .close").on("click", function () {
        $("#mobile-sub").removeClass("open")
    }), $(".Mac").hide(), $(".Win").show(), $("#intro").addClass("WinInterFace").removeClass("MacInterFace")), $("#burger").on("click", function () {
        $(this).toggleClass("open"), $("#mobile-nav").toggleClass("open")
    }), $(".mobile-nav li a").on("click", function () {
        $("#mobile-nav").hasClass("open") && $("#mobile-nav").removeClass("open"), $("#burger").hasClass("open") && $("#burger").removeClass("open")
    }), $("#HowItWorksList"), $("#HowItWorksList li").on("click", function () {
        var e = $(this).data("list");
        $(this).addClass("active").siblings().removeClass("active"), $('.image-wrapper .image[data-list="' + e + '"]').addClass("active").siblings().removeClass("active")
    }), $("#tweetsSlider").owlCarousel({
        loop: !1,
        autoplay: !0,
        nav: !0,
        autoplayHoverPause: !1,
        margin: 10,
        responsiveClass: !0,
        smartSpeed: 600,
        navSpeed: 600,
        responsive: {
            0: {
                items: 1,
                nav: !0,
                loop: !0
            },
            600: {
                items: 1,
                nav: !0,
                loop: !0
            },
            1000: {
                items: 3,
                nav: !0,
                loop: !1,
                margin: 50
            }
        }
    })
}),
    function () {
        var e = $("#app-noise-cancellation-switch"),
            n = $("#app-play-button"),
            a = $("#app-play-state"),
            i = $("#app-pause-state"),
            o = $("#app-select-sound"),
            s = $("#app-playing-progress"),
            t = $("#app-app-environment-container"),
            l = $("#app-environment-image"),
            r = $("#app-take-listen"),
            d = $("#app-icon"),
            c = null,
            m = !1,
            p = -1,
            u = Cookies.get("app-guideStep") || "play",
            f = [{
                id: "backgroundMusicRemoval",
                name: "Background Music Removal"
            }, {
                id: "coffeeshop",
                name: "Coffee Shop"
            }
                // , {
                //     id: "scrum",
                //     name: "Scrum Meeting"
                // }, {
                //     id: "pizza",
                //     name: "Conferencing"
                // }
            ];

        function v() {
            $(".guide").addClass("hidden"), $("#guide-" + u).removeClass("hidden")
        }

        function g(e) {
            "finished" !== u && (u = e, Cookies.set("app-guideStep", u, {
                expires: 7
            }), v())
        }

        function C() {
            var o = f[p];
            (c = new Sound(o.id)).on("loaded", function () {
                n.attr("disabled", !1).on("click", function (e) {
                    e.preventDefault(), g("switch"), (m = !m) ? (a.addClass("hidden"), i.removeClass("hidden"), c.play()) : (i.addClass("hidden"), a.removeClass("hidden"), c.pause())
                }), e.on("click", function (n) {
                    n.preventDefault(), g("finished"), e.toggleClass("on").toggleClass("off"), d.toggleClass("on").toggleClass("off"), c.clearNoise()
                })
            }), c.on("update", function (e, n) {
                var a, i;
                a = e, i = n, s.width(Math.round(a / i * 100) + "%")
            }), c.on("ended", function () {
                h(), m = !1
            }), l.find("img").removeClass("opaque").filter(":eq(" + p + ")").addClass("opaque"), l.find("img").attr("alt", "Krisp"), t.removeClass().addClass("app-environment-container app-environment-" + o.id)
        }

        function h() {
            i.addClass("hidden"), a.removeClass("hidden"), s.width(0)
        }

        function b() {
            c && (c.destroy(), h(), n.attr("disabled", !0).off("click"), i.addClass("hidden"), a.removeClass("hidden"), e.removeClass("on").addClass("off").off("click"), d.removeClass("on").addClass("off"), c = null, m = !1)
        }

        v(), $("#mute-target").Morphext({
            animation: "flipInX",
            separator: "|",
            speed: 3e3
        }), r.on("click", function (e) {
            e.preventDefault(), $("html, body").animate({
                scrollTop: t.offset().top
            }, 500)
        }), o.on("click", "span", function (e) {
            var n = $(this).parent(),
                a = n.index();
            e.preventDefault(), a !== p && (n.addClass("selected").siblings().removeClass("selected"), p = a, b(), C())
        }), o.append(f.map(function (e) {
            return '<li><span  data-id="' + e.id + '">' + e.name + "</span></li>"
        })), l.append(f.map(function (e) {
            return '<img src="' + "images/environments/bg-" + e.id + '.jpg" />'
        })), o.find("span:first").trigger("click")
    }();