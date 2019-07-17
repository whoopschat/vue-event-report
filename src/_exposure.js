import { onChanged } from "./utils/changed";

let _els = [];
let _reports = [];
let _handler = null;
let _inited = false;

function __getViewportSize() {
    return {
        w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

function _getAbsoluteScroll(element) {
    let scrollTop, scrollLeft;
    scrollTop = 0;
    scrollLeft = 0;
    while (element = element.parentElement) {
        scrollTop += -(element.scrollTop || 0);
        scrollLeft += - (element.scrollLeft || 0);
    }
    return { scrollTop, scrollLeft };
}

function _getAbsoluteLocation(element) {
    if (arguments.length != 1 || element == null) {
        return null;
    }
    var { scrollTop, scrollLeft } = _getAbsoluteScroll(element);
    var offsetTop = element.offsetTop;
    var offsetLeft = element.offsetLeft;
    var offsetWidth = element.offsetWidth;
    var offsetHeight = element.offsetHeight;
    while (element = element.offsetParent) {
        offsetTop += element.offsetTop;
        offsetLeft += element.offsetLeft;
    }
    return {
        top: offsetTop + scrollTop,
        left: offsetLeft + scrollLeft,
        width: offsetWidth,
        height: offsetHeight
    };
}

function _checkVisible(div) {
    try {
        let { w, h } = __getViewportSize();
        let { top, left, width, height } = _getAbsoluteLocation(div);
        return width > 0 && height > 0 && top + height >= 0 && top < h && left + width >= 0 && left < w;
    } catch (error) {
    }
    return false;
}

function _canExposure(el) {
    try {
        let key = el.getAttribute("report-key");
        if (!key) {
            return true;
        }
        if (!key || _reports.indexOf(key) < 0) {
            _reports.push(key);
            return true;
        }
    } catch (error) {
    }
    return false;
}

function _checkExposure(el) {
    try {
        let show = _checkVisible(el);
        let time = el.getAttribute("exposure-time");
        if (show && !time && _canExposure(el)) {
            el.setAttribute("exposure-time", Date.now());
            _handler && _handler(el);
        }
    } catch (error) {
    }
}

export function addExposure(el) {
    _checkExposure(el);
    if (el && _els.indexOf(el) == -1) {
        _els.push(el);
    }
}

export function delExposure(el) {
    let index = _els.indexOf(el);
    if (index >= 0) {
        _els.splice(index, 1);
    }
}

export function resetExposure(el) {
    try {
        el.setAttribute("exposure-time", "");
    } catch (error) {
    }
    _checkExposure(el);
}

export function initExposure(handler) {
    if (_inited) {
        return;
    }
    _inited = true;
    _handler = handler;
    onChanged(() => {
        _els.forEach(el => {
            _checkExposure(el);
        });
    });
}