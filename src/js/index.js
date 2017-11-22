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
    // loop: true,
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

// let isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios 终端
// let playing = true
// // isIos = true
// if (isIos) {
//     playing = false
//     $('#music').css('animation', 'none')
//     document.getElementById('audio').pause()
// } else {
//     document.getElementById('audio').play()
// }
// document.getElementById('audio').pause()
//     document.getElementById('audio').play()

let playing = true

function audioAutoPlay(id){
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        audio.play();
    }, false);
}
audioAutoPlay('audio')

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


//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    //addMarker();//向地图中添加marker

    var point = new BMap.Point(113.390522, 23.108502)
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);
    var opts = {
        width : 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title : "世纪晟" , // 信息窗口标题
        enableMessage:true,//设置允许信息窗发送短息
        message:""
    }
    var infoWindow = new BMap.InfoWindow("地址：广东省广州市天河区冼村街潭村路350号跑马地大厦9楼西区", opts);  // 创建信息窗口对象
    marker.addEventListener("click", function(){
        //map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
    map.enableScrollWheelZoom();    // 启动鼠标滚轮操作

    //map.openInfoWindow(infoWindow,point); //开启信息窗口
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("map");//在百度地图容器中创建一个地图
    var point = new BMap.Point(113.390522, 23.108502);//定义一个中心点坐标
    map.centerAndZoom(point, 14);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    //map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    //map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    //map.addControl(ctrl_sca);
}

initMap()

$('#loading').hide()

// var url = encodeURIComponent(location.href.split('#')[0])

// let domain = 'http://192.168.3.22:12222'
// let domain = 'http://120.24.226.112:12222'

var url = location.href.split('#')[0]
let domain = 'http://m.liangchuantech.com'

$.ajax({
    url: domain + "/wechat/jsapi?url=" + encodeURIComponent(url),
    success: function (result) {
        console.log('原先的URL')
        console.log(location.href.split('#')[0])
        console.log('url')
        console.log(url)
        console.log('结果')
        console.log(result)
        wx.config({
               // debug: true,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'hideOptionMenu'
            ]
        })

        wx.ready(function() {
            wx.error(function(res){
                // alert('失败')
                // alert(res)
                console.log('失败', res)
            })

            let title = '量川科技开业邀请函'
            let desc = '11月28日广州量川科技隆重开业'
            var imgUrl = location.origin + '/static/img/wechat-logo-300.jpg'

            console.log('图片地址')
            console.log(imgUrl)
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: title,
                desc: desc,
                link: url,
                imgUrl: imgUrl,
                success: function () {
                    console.log('确认分享2')
                },
                cancel: function () {
                    console.log('取消分享2')
                }
            })
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: url,
                imgUrl: imgUrl,
                success: function () {
                    console.log('确认分享')
                },
                cancel: function () {
                    console.log('取消分享')
                }
            })
            wx.checkJsApi({
                jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            })
        })
    }
})