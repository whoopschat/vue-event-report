export function del(key, el) {
    try {
        el.setAttribute(`binding-${key}`, '');
    } catch (error) {
    }
}

export function get(key, el) {
    try {
        let data = el.getAttribute(`binding-${key}`);
        return JSON.parse(data);
    } catch (error) {
    }
}

export function set(key, el, binding) {
    try {
        el.setAttribute(`binding-${key}`, JSON.stringify(binding));
    } catch (error) {
    }
}