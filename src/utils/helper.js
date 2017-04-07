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