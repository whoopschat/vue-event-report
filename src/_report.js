import { get, set, del } from "./utils/binding";
import { addDirective } from "./utils/directive";
import { onAttachEvent } from "./utils/event";
import { initExposure, addExposure, delExposure, resetExposure } from "./_exposure";

let _inited = false;
let _handleReport = null;

export function _reportEvent(event, data) {
    _handleReport && _handleReport({ event, data })
}

export function _initReport(vue, handler) {
    if (_inited || !vue || !handler) {
        return;
    }
    _inited = true;
    _handleReport = handler;
    initExposure((el) => {
        let data = get('exposure', el);
        if (data && data.value) {
            _handleReport && _handleReport({ event: 'exposure', data: data.value })
        }
    });
    addDirective(vue, 'report', {
        bind: function (el, binding) {
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:click') {
                set('click', el, binding);
                onAttachEvent(el, 'click', () => {
                    let data = get('click', el);
                    if (data && data.value) {
                        _handleReport && _handleReport({ event: 'click', data: data.value })
                    }
                });
            }
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:exposure') {
                set('exposure', el, binding);
                addExposure(el);
            }
        },
        update: function (el, binding) {
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:click') {
                set('click', el, binding);
            }
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:exposure') {
                set('exposure', el, binding);
                resetExposure(el);
            }
        },
        unbind: function (el) {
            del('click', el);
            del('exposure', el);
            delExposure(el);
        },
    })
}