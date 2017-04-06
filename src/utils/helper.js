(function(window){
window.methodCover = {
    capacity: function (msg, time) {
        var time = time || 1000;
        var $el = $('<div class="alert-light-box"><div class="msg-box">' + msg + '</div><div class="bg-box">' + msg + '</div></div>');
        $(document.body).append($el);
        var msg = $el.find('.msg-box');
        var bg = $el.find('.bg-box');
        var leftValue = ($el.width() - msg.width()) / 2;
        msg.css('left', leftValue + 'px');
        bg.css('left', leftValue + 'px');
        setTimeout(function () {
            setTimeout(function () {
                $el.remove();
                $el = null;
            }, 400);
            $el.css('opacity', 0);
        }, time);
    },
    urlback: function (backurl) { //
        if (history.length > 1) {
            history.back();
        } else {
            if (typeof backurl == 'undefind' || !backurl) {
                backurl = '/';
            }
            history.href = backurl;
        }
    },
    getParams: function () {
        var key = window.location.hash;
        return data[key].params;
    },
    setItem: function (key, value) {
        data[key] = value;
    },
    getItem: function (key) {
        return data[key];
    },
    getCount: function () {
        data.zIndex++;
        return data.zIndex;
    },
    setForword: function (val) {
        data.isForward = val;
    },
    getForword: function () {
        return data.isForward;
    },
    on: function (key, fun) {
        if (!data.events) {
            data.events = {};
        }
        data.events[key] = fun;
    },
    emit: function (key, params) {
        var evts = data.events;
        if (evts) {
            evts[key] && evts[key](params);
        }
    },
    go: function (url, param) { //跳转
        // var that = this.methodCover;
        console.log(this);
        this.setForword(true);
        var btn = $('<a href="' + url + '" style="display:none"></a>');
        $(document.body).append(btn);
        btn.get(0).click();
        var key = window.location.hash;
        var obj = this.getItem(key);
        if (obj) {
            obj.params = param;
        } else {
            this.setItem(key, {
                params: param
            });
        }
        btn.remove();
    },
    back: function () { //返回
        // var that = this.methodCover;
        if (flag) {
            flag = false;
            setTimeout(function () {
                flag = true;
            }, 700);
            this.setForword(false);
            window.history.back();
        }
    }
};
})(window)
