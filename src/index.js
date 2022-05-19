import { _initReport, _reportEvent } from './_report';

let _handler = null;
let _installed = false;

function install(vue) {
    if (_installed || !vue) {
        return;
    }
    _initReport(vue, (...params) => {
        _handler && _handler(...params);
    });
    if (vue && vue.prototype) {
        vue.prototype.$reportEvent = reportEvent;
    }
    _installed = true;
}

function setReportHandler(handler) {
    if (handler && typeof handler === 'function') {
        _handler = handler;
    }
}

function reportEvent(event, data) {
    _reportEvent(event, data);
}

module.exports = {
    install,
    setReportHandler,
    reportEvent,
}