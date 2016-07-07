import assign from 'object-assign';
import { fromJS, List, Map } from 'immutable';

export function custom(endpoint) {
    return (name, relative = true) => {
		if(relative) {
			return member(endpoint.new(endpoint.path().push(name))); // eslint-disable-line no-use-before-define
		}
        return member(endpoint.new(List().push(name))); // eslint-disable-line no-use-before-define
    };
}

export function collection(endpoint) {
    function _bindHttpMethod(method) {
        return (...args) => {
            const id = args.shift();
            return member(endpoint.new(endpoint.path().push(id)))[method](...args);  // eslint-disable-line no-use-before-define
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
        all: (name) => collection(endpoint.new(endpoint.path().push(name))),
        custom: custom(endpoint),
        one: (...args) => member(endpoint.new( endpoint.path().push(...args) )),
    });
}
