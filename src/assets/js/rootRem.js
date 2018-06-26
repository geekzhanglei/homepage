(function(doc, win) {
    let docEl = doc.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return;
        }
        if (clientWidth > 1028) {
            docEl.style.fontSize = Math.round(10 * (clientWidth / 1366)) + 'px';
        }
        if (clientWidth <= 1028 && clientWidth > 0) {
            docEl.style.fontSize = Math.round(10 * (clientWidth / 375)) + 'px';
        }
    };
    if (!doc.addEventListener) {
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
