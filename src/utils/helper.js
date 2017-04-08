(function (window) {
    var flag = true;
    window.methodCover = {
        capacity: function (msg, time) {
            var time = time || 1000;
            var $el = $('<div class="alert-light-box"><div class="msg-box">' + msg + '</div><div class="bg-box">' + msg + '</div></div>');
            $(document.body).append($el);
            var msg = $el.find('.msg-box');
            var bg = $el.find('.bg-box');
            var leftValue = ($el.width() - (msg.width() + 60)) / 2;
            var topValue = ($el.height() - (msg.height() + 30)) / 2;
            msg.css({
                'left': leftValue + 'px',
                'top': topValue + 'px'
            });
            bg.css({
                'left': leftValue + 'px',
                'top': topValue + 'px'
            });
            setTimeout(function () {
                setTimeout(function () {
                    $el.remove();
                    $el = null;
                }, 400);
                $el.css('opacity', 0);
            }, time);
        },
        getParams: function (getName) {
            var data = JSON.parse(sessionStorage.getItem(getName));
            return data;
        },
        go: function (url, setNmae, param) { //跳转
            var btn = $('<a href="' + url + '" style="display:none"></a>');
            $(document.body).append(btn);
            btn.get(0).click();
            if (param && setNmae) {
                var params=JSON.stringify(param);
                sessionStorage.setItem(setNmae,params);
            };
            btn.remove();
        },
        back: function () { //返回
            if (flag) {
                flag = false;
                setTimeout(function () {
                    flag = true;
                }, 700);
                window.history.back();
            }
        }
    };
})(window)

;(function($) {
    $.fn.popup = function(options){
        var defaults = {
            width:"90%"
        }
        var options = $.extend(defaults,options);

        var $this = $(this)
        const {width,height} = options;
	    var $dom,$wrap;
        if( ! $this.hasClass('init') ){
            $dom	= init( $this );
            $wrap	= $dom.find('.hw-wrap');
        }else{
            $wrap	= $this.parent();
            $dom	= $wrap.parent();
        }
        if( options &&width && height ){
            $wrap.css({width, height});
        }
        $dom.fadeIn('fast');
	    $this.css('display', 'block');
    }
	function init($d){
        var body = $('body')
        var dom = $(`
        <div class="hw-modal"><div class="hw-wrap"><div class="hw-close"><i></i></div></div></div>`)
        body.append(dom)
		
	    dom.find('.hw-close').on('click', ()=>{
			dom.fadeOut('fast');
		});
		
		dom.find('.hw-wrap').on('click', (e)=>{
			e.stopPropagation();
		}).append( $d );
		
		$d.addClass('init');
		
		return dom;
	}
})(jQuery);