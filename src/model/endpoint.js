import assign from 'object-assign';
import responseFactory from './response';
import { fromJS, List, Map } from 'immutable';
import serialize from '../util/serialize';

const PATH_SEPARATOR = '/';

/* eslint-disable new-cap */
export default function(request) {
    return function endpointFactory(scope) {
        scope.on('error', () => true); // Add a default error listener to prevent unwanted exception
        const endpoint = {}; // Persists reference

        function _generateRequestConfig(method, data, params, headers) {
            let config = Map({
                errorInterceptors: List(scope.get('errorInterceptors')),
                headers: Map(scope.get('headers')).mergeDeep(Map(headers)),
                method,
                params,
                requestInterceptors: List(scope.get('requestInterceptors')),
                responseInterceptors: List(scope.get('responseInterceptors')),
                url: Promise.all( scope.get('path') ).then((path) => {
					return path.join(PATH_SEPARATOR);
				}),
            });

            if (data) {
                if (!config.hasIn(['headers', 'Content-Type'])) {
                    config = config.setIn(['headers', 'Content-Type'], 'application/json;charset=UTF-8');
                }

                config = config.set('data', fromJS(data));
            }

            return config;
        }

        function _onResponse(config, rawResponse) {
            const response = responseFactory(rawResponse, endpoint);
            scope.emit('response', response, serialize(config));
            return response;
        }

        function _onError(config, error) {
            scope.emit('error', error, serialize(config));
            throw error;
        }

        function _httpMethodFactory(method, expectData = true) {
            const emitter = (...args) => {
                scope.emit(...args);
            };

            if (expectData) {
                return (data, params = null, headers = null) => {
                    const config = _generateRequestConfig(method, data, params, headers);
                    return request(config, emitter).then(
                        (rawResponse) => _onResponse(config, rawResponse),
                        (rawResponse) => _onError(config, rawResponse)
                    );
                };
            }

            return (params = null, headers = null) => {
                const config = _generateRequestConfig(method, null, params, headers);
                return request(config, emitter).then(
                    (rawResponse) => _onResponse(config, rawResponse),
                    (error) => _onError(config, error)
                );
            };
        }

        function addInterceptor(type) {
            return (interceptor) => {
                scope.push(`${type}Interceptors`, interceptor);

                return endpoint;
            };
        }

        assign(endpoint, {
            addErrorInterceptor: addInterceptor('error'),
            addRequestInterceptor: addInterceptor('request'),
            addResponseInterceptor: addInterceptor('response'),
            delete: _httpMethodFactory('DELETE'),
            identifier: newIdentifier => {
                if (newIdentifier === undefined) {
                    return scope.get('config').get('entityIdentifier');
                }

                scope.assign('config', 'entityIdentifier', newIdentifier);

                return endpoint;
            },
            get: _httpMethodFactory('GET', false),
            head: _httpMethodFactory('HEAD', false),
            header: (key, value) => scope.assign('headers', key, value),
            headers: () => scope.get('headers'),
            new: (path, relative = true) => {
                const childScope = scope.new();

				if( path ) {
					if( typeof path === 'string' ) {
						path = path.split(PATH_SEPARATOR);
					}

					if( !relative ) {
						childScope.set('path', List());
					}

					path.forEach((item) => {
						childScope.push('path', item.toString().trim(PATH_SEPARATOR));
					});
				}

                return endpointFactory(childScope);
            },
            on: scope.on,
            once: scope.once,
            patch: _httpMethodFactory('PATCH'),
            post: _httpMethodFactory('POST'),
            put: _httpMethodFactory('PUT'),
			path: () => scope.get('path'),
			url: Promise.all( scope.get('path') ).then((path) => {
				return path.join(PATH_SEPARATOR);
			})
        });

        return endpoint;
    };
}
