import { _initReport, _reportEvent } from './_report';

let _handler = null;
let _installed = false;

function setGlobal(key, value, vue) {
    if (key && value && typeof key == 'string') {
        if (typeof window !== 'undefined') {
            window[key] = value;
        }
        if (vue && vue.prototype) {
            vue.prototype[key] = value;
        }
    }
}

let _instance = { install };

function install(vue, alias = 'VReport') {
    if (_installed || !vue) {
        return;
    }
    _initReport(vue, (...params) => {
        _handler && _handler(...params);
    });
    _instance.setReportHandler = (handler) => {
        if (handler && typeof handler === 'function') {
            _handler = handler;
        }
    }
    _instance.reportEvent = (event, data) => {
        _reportEvent(event, data);
    }
    setGlobal(alias, _instance, vue);
    _installed = true;
}

module.exports = _instance;