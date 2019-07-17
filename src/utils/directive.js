export function addDirective(vue, name, config) {
    try {
        vue.directive(name, config);
    } catch (error) {
    }
}