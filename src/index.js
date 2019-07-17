import { _initReport } from './_report';

let _inited = false;
let _vue = null;

function install(vue) {
    if (_inited || !vue) {
        return;
    }
    _inited = true;
    _vue = vue;
}

function setReportHandler(handler) {
    _initReport(_vue, handler);
}

const _instance = { install, setReportHandler }

if (typeof window !== 'undefined') {
    window['ReportInstaller'] = _instance;
}

module.exports = _instance;