import assign from 'object-assign';

export function custom(endpoint) {
    return (name, relative = true) => {
        return member(endpoint.new(name, relative)); // eslint-disable-line no-use-before-define
    };
}

export function collection(endpoint) {
    function _bindHttpMethod(method) {
        return (...args) => {
            const id = args.shift();
            return member(endpoint.new([ id ]))[method](...args);  // eslint-disable-line no-use-before-define
        };
    }

    return assign(endpoint, {
        custom: custom(endpoint),
        delete: _bindHttpMethod('delete'),
        getAll: endpoint.get,
        get: _bindHttpMethod('get'),
        head: _bindHttpMethod('head'),
        patch: _bindHttpMethod('patch'),
        put: _bindHttpMethod('put'),
    });
}

export function member(endpoint) {
    return assign(endpoint, {
        all: (name) => collection(endpoint.new( name ) ),
        custom: custom(endpoint),
        one: (name, id) => member(endpoint.new( [name, id] )),
    });
}
