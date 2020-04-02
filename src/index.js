import { _initReport, _reportEvent } from './_report';

let _handler = null;
let _installed = false;

function create(vue) {
    _initReport(vue, (...params) => {
        _handler && _handler(...params);
    });
    return {
        setReportHandler: (handler) => {
            if (handler && typeof handler === 'function') {
                _handler = handler;
            }
        },
        reportEvent: (event, data) => {
            _reportEvent(event, data);
        }
    }
}

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

function install(vue) {
    if (_installed || !vue) {
        return;
    }
    let vreport = create(vue);
    setGlobal("VReport", vreport, vue);
    _installed = true;
}

module.exports = {
    install
}