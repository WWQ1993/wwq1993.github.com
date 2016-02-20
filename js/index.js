define(function (require, exports, module) {
    var $ = require('js/jquery.js');
    exports.init = function () {
        initTimeLine();
        $(window).resize(function () {
            resizeCanvas();
        })
        $(window).resize();
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
})