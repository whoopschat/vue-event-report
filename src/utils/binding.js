let _report_bindings = {};
let _report_incr_id = 1;

function getBindKey(key, el) {
    try {
        let id = el.getAttribute("v-report-id");
        if (!id) {
            id = _report_incr_id++;
            el.setAttribute("v-report-id", id);
        }
        return key + "-" + id;
    } catch (error) {
    }
}

export function del(key, el) {
    let realKey = getBindKey(key, el);
    if (!realKey) {
        return;
    }
    delete _report_bindings[realKey];
}

export function get(key, el) {
    let realKey = getBindKey(key, el);
    if (!realKey) {
        return;
    }
    return _report_bindings[realKey];
}

export function set(key, el, binding) {
    let realKey = getBindKey(key, el);
    if (!realKey) {
        return;
    }
    _report_bindings[realKey] = binding;
}