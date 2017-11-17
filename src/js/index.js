var scaleW = window.innerWidth / 320;
var scaleH = window.innerHeight / 480;
var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
    resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
    resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
    resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
    resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';

}
var scales = document.querySelectorAll('.txt');
for (var i = 0; i < scales.length; i++) {
    var ss = scales[i].style;
    ss.webkitTransform = ss.MsTransform = ss.msTransform = ss.MozTransform = ss.OTransform = ss.transform = 'translateX(' + scales[i].offsetWidth * (scaleW - 1) / 2 + 'px) translateY(' + scales[i].offsetHeight * (scaleH - 1) / 2 + 'px)scaleX(' + scaleW + ') scaleY(' + scaleH + ') ';
}


var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // pagination: '.swiper-pagination',
    mousewheelControl: true,
    watchSlidesProgress: false,
    onInit: function (swiper) {
        swiperAnimateCache(swiper);
        swiperAnimate(swiper);
        swiper.myIndex = 0;//activeIndex在滑动到一半时会切换，改用滑动完再切换的myIndex
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper);
    },
    onProgress: function(swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {

            var slide=swiper.slides.eq(i);
            var progress = swiper.slides[i].progress;
            var translate, boxShadow;
            translate = progress * swiper.height * 0.8;
            var scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            if (i == swiper.myIndex) {
                slide.transform('translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
                slide.css({
                    'z-index': 0
                    // 'boxShadow': '0px 0px 10px rgba(0,0,0,.5)'
                });
            }
        }
    },
    onTransitionEnd: function(swiper) {
        swiper.myIndex = swiper.activeIndex;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            slide.transform('');
            slide.css('z-index',1);
        }
        swiper.enableMousewheelControl();
        //swiper.enableTouchControl();
    },
    onSetTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            slide.transition(speed + 'ms');
        }
        swiper.disableMousewheelControl();
        //swiper.disableTouchControl();
    }
})
$('#loading').hide()
let playing = true
$('#music').on('click', function () {
    if (playing) {
        $(this).css('animation', 'none')
        document.getElementById('audio').pause()
    } else {
        $(this).css('animation', 'rotating 1.2s linear infinite')
        document.getElementById('audio').play()
    }
    playing = !playing
})
document.getElementById('audio').pause()