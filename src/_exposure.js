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

function _getStyle(element, attr) {
    try {
        return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, false)[attr];
    } catch (error) {
    }
}

function _getScroll(element) {
    let scrollTop = 0;
    let scrollLeft = 0;
    try {
        if (element && _getStyle(element, 'position') != 'fixed') {
            let next = () => {
                element = element.parentElement || element.offsetParent;
                return element && _getStyle(element, 'position') != 'fixed';
            }
            while (next()) {
                scrollTop += -(element.scrollTop || 0);
                scrollLeft += - (element.scrollLeft || 0);
            }
        }
    } catch (error) {
    }
    return { scrollTop, scrollLeft };
}

function _getElement(el) {
    if (typeof el === 'string') {
        try {
            el = document.documentElement.querySelector(el);
        } catch (error) {
        }
    }
    return el;
}

function _getPosition(el) {
    let element = _getElement(el);
    if (arguments.length != 1 || element == null) {
        return null;
    }
    let scrollTop = 0;
    let scrollLeft = 0;
    let offsetTop = 0;
    let offsetLeft = 0;
    let offsetWidth = 0;
    let offsetHeight = 0;
    try {
        let scroll = _getScroll(element);
        scrollTop = scroll.scrollTop || 0;
        scrollLeft = scroll.scrollLeft || 0;
        offsetTop = element.offsetTop || 0;
        offsetLeft = element.offsetLeft || 0;
        offsetWidth = element.offsetWidth || element.clientWidth || 0;
        offsetHeight = element.offsetHeight || element.clientHeight || 0;
        while (element = element.offsetParent || element.parentNote || element.parentElement) {
            offsetTop += element.offsetTop;
            offsetLeft += element.offsetLeft;
        }
    } catch (error) {
    }
    return {
        top: offsetTop + scrollTop,
        left: offsetLeft + scrollLeft,
        width: offsetWidth,
        height: offsetHeight,
    }
}

function _checkVisible(div) {
    try {
        let { w, h } = __getViewportSize();
        let { top, left, width, height } = _getPosition(div);
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