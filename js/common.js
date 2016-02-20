/**
 * Created by ÕÚ«ø on 2016/2/20 0020.
 */
define(function (require, exports, module) {
    var $ = require('js/jquery.js');

    var component = {
        header:$('header'),
        nav:$('nav')
    }

    exports.init = function () {
        setHtmlFontSize();
        scroll();

    };



    function setHtmlFontSize() {
        $(window).bind('resize', function () {
            $('html').css('font-size', Math.min($(window).width(), $(window).height()) / 25);
            //$(window).scroll();
        });
        $(window).trigger('resize');
    };

    function scroll() {
        $(window).scroll(function (e) {
            var scrollTop = $(document).scrollTop();
            setNavPos(scrollTop);

        })
    };
    function setNavPos(scrollTop){
        var posY = component.header.height()-scrollTop;

        if(posY<=0){
            component.nav.addClass('navFloat');
        }
        else{
            component.nav.removeClass('navFloat');
        }
    }
})