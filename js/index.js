define(function (require, exports, module) {
    var $ = require('js/jquery.js');
    exports.init = function () {
        initTimeLine();
        $(window).resize(function () {
            resizeCanvas();
        })
        $(window).resize();
        initShare();
    };
    var initTimeLine = function () {
        var canvas = $('.timeLine')[0],
            context = canvas .getContext("2d");


        context.beginPath();
        canvas.lineWidth = 100;
        canvas.lineHeight = 100;   canvas .width=1000;
        canvas .height=1000;
        context.strokeStyle = "rgb(250,0,0)";
        context.lineTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();
        context.beginPath();
        context.strokeStyle = "blue";
        context.lineTo(canvas.width / 2-25, 50);
        context.lineTo(canvas.width / 2+25, 50);
        context.stroke();

        context.font = 'bold 30px arial';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillStyle = 'blue';
        context.moveTo(canvas.width / 2-200 , 50);
        context.fillText('2015/07/12', canvas.width / 2-200, 35);

    }

    function resizeCanvas() {
        var canvas = $('.timeLine')
        canvas.width(canvas.parent().width());
        canvas.height(canvas.parent().width());
    }

    var initShare = function () {
        var imgUrl = 'http://wwq1993.github.io/img/0.jpg';
        var lineLink = 'http://www.jakehu.me/904';
        var descContent = "这是晨曦的博客";
        var shareTitle = '晨曦';
        var appid = '';

        function shareFriend() {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            })
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('timeline', res.err_msg);
            });
        }
        function shareWeibo() {
            WeixinJSBridge.invoke('shareWeibo',{
                "content": descContent,
                "url": lineLink,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                shareWeibo();
            });
        }, false);
    }
})