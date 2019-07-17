import { onAttachEvent } from "./event";

let _inited = false;
let _onchangeds = [];
let _checktimer = null;

function _handleChanged() {
    if (_checktimer) {
        return;
    }
    _checktimer = setTimeout(() => {
        _checktimer = null;
        _onchangeds.forEach(changed => {
            changed && changed();
        });
    }, 100);
}

function _init() {
    if (_inited) {
        return;
    }
    _inited = true;
    onAttachEvent(window, 'touchmove', _handleChanged);
    onAttachEvent(window, 'scroll', _handleChanged);
    onAttachEvent(window, 'resize', _handleChanged);
    onAttachEvent(document, 'DOMContentLoaded', _handleChanged);
    setInterval(_handleChanged, 500);
}

export function onChanged(onchanged) {
    _init();
    if (onchanged && typeof onchanged == 'function' && _onchangeds.indexOf(onchanged) < 0) {
        _onchangeds.push(onchanged);
    }
}