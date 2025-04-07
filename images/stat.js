(function() {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var token = currentScript.getAttribute('data-token');
    
    if (!token) {
        console.error('统计代码缺少token参数');
        return;
    }
    
    function sendStat() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '//cscs.x3322.net/stat.php?token=' + encodeURIComponent(token) + 
                 '&page=' + encodeURIComponent(window.location.href) + 
                 '&title=' + encodeURIComponent(document.title) + 
                 '&sw=' + screen.width + 
                 '&sh=' + screen.height, true);
        xhr.send();
    }
    
    if (window.addEventListener) {
        window.addEventListener('load', sendStat, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', sendStat);
    }
})(); 
