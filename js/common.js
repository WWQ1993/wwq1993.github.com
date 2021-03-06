/**
 * Created by ��ǿ on 2016/2/20 0020.
 */
define(function (require, exports, module) {
    var $ = require('js/jquery.js');

    var component = {
        header: $('header'),
        nav: $('nav')
    }

    exports.init = function () {
        setHtmlFontSize();
        scroll();

    };

    function setHtmlFontSize() {
        var IsPC = function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                flag = Math.min($(window).width(), $(window).height()) >= 600 ? true : false;
            }
            return flag;
        }
        $(window).bind('resize', function () {
            $('html').css('font-size', (Math.min($(window).width(), $(window).height())>600?600:Math.min($(window).width(), $(window).height()) )/ (IsPC() ? 25 : 15));
        });
        $(window).trigger('resize');
    };

    function scroll() {
        $(window).scroll(function (e) {
            e.preventDefault();
            var scrollTop = $(document).scrollTop();
            setNavPos(scrollTop);
        })
    };
    function setNavPos(scrollTop) {
        var posY = component.header.height() - scrollTop;

        if (posY <= 0) {
            component.nav.addClass('navFloat');
        }
        else {
            component.nav.removeClass('navFloat');
        }
    }
})