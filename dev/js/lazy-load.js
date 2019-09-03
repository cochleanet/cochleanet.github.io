/**
 * Created by mherv on 11/10/2018.
 */
document.addEventListener("DOMContentLoaded", function () {
    var lazyImages = [];
    var active = false;
    var placeholderImg = '';
    // var docElement = document.documentElement;

    [].slice.call(document.querySelectorAll('.single-post.entry-content img')).forEach(function (lazyImage) {
        lazyImage.className += " tenweb_lazy";
    });

    function initLazyLoad() {
        lazyImages = [].slice.call(document.querySelectorAll(".tenweb_lazy"));
        set_placeholder();
        lazyLoad(true);
    }

    function set_placeholder() {

        [].slice.call(document.querySelectorAll('.tenweb_lazy')).forEach(function (lazyImage) {
            if (lazyImage.tagName === 'IMG') {
                if (lazyImage.src === "") {
                    lazyImage.src = placeholderImg;
                    lazyImage.className += " tenweb_lazy_placeholder";
                }
            } else {
                if (lazyImage.style.backgroundImage === "") {
                    lazyImage.style.backgroundImage = 'url("' + placeholderImg + '")';
                    lazyImage.className += " tenweb_lazy_placeholder";
                }
            }
        });

    }

    function lazyLoad(force) {

        force = (typeof force !== "undefined") ? force : false;

        if (active === false || force === true) {
            active = true;

            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    if (is_element_visible(lazyImage) && typeof lazyImage.dataset.load === "undefined" && is_element_in_window(lazyImage)) {

                        lazyImage.setAttribute('data-load', '1');
                        loadImage(lazyImage);

                        lazyImages = lazyImages.filter(function (image) {
                            return image !== lazyImage;
                        });

                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                });

                active = false;
            }, 200);
        }
    }

    function is_element_visible(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);//from jquery
    }

    function is_element_in_window(element) {
        var topA = window.innerHeight;
        var bottomA = window.innerHeight;

        if (getComputedStyle(element).display === "none") {
            return false;
        }

        return (element.getBoundingClientRect().top <= window.innerHeight + topA && element.getBoundingClientRect().bottom >= 0 - bottomA);
    }

    function loadImage(lazyImage) {
        var img = document.createElement('img');

        var src = lazyImage.dataset.src;
        var srcset = (typeof lazyImage.dataset.srcset !== "undefined") ? lazyImage.dataset.srcset : null;

        img.onload = function () {

            if (lazyImage.tagName === 'IMG') {
                lazyImage.src = src;
                if (srcset !== null) {
                    lazyImage.srcset = srcset;
                    lazyImage.removeAttribute('data-srcset');
                }
            } else {
                lazyImage.style.backgroundImage = 'url("' + src + '")';
            }

            lazyImage.removeAttribute('data-src');

            lazyImage.classList.remove("tenweb_lazy");
            lazyImage.classList.remove("tenweb_lazy_placeholder");
            lazyImage.className += " tenweb_lazy_loaded";
        };

        img.setAttribute('src', src);
        if (srcset !== null) {
            img.setAttribute('srcset', srcset);
        }
    }

    initLazyLoad();

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);

    window.addEventListener('tenweb_search_images_for_lazy_load', initLazyLoad, false);
});

var tenweb_search_images_for_lazy_load = new Event('tenweb_search_images_for_lazy_load');