'use strict';

Object.defineProperty(exports, '__esModule', {
				value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function parseBody(response) {
				return response.text().then(function (text) {
								if (!text || !text.length) {
												(0, _warning2['default'])(response.status === 204, 'You should return a 204 status code with an empty body.');
												return null;
								}

								(0, _warning2['default'])(response.status !== 204, 'You should return an empty body with a 204 status code.');

								try {
												return JSON.parse(text);
								} catch (error) {
												return text;
								}
				});
}

exports['default'] = function (fetch) {
				return function (config) {

								return config.url.then(function (url) {

												delete config.url;

												if (config.data) {
																if (/application\/json/.test(config.headers['Content-Type'])) {
																				config.body = JSON.stringify(config.data);
																} else if (/application\/x-www-form-urlencoded/.test(config.headers['Content-Type'])) {
																				config.body = _qs2['default'].stringify(config.data, { arrayFormat: 'brackets' });
																} else {
																				config.body = config.data;
																}
																delete config.data;
												}

												var queryString = _qs2['default'].stringify(config.params || {}, { arrayFormat: 'brackets' });
												delete config.params;

												return fetch(!queryString.length ? url : url + '?' + queryString, config).then(function (response) {
																return parseBody(response).then(function (json) {
																				var headers = {};

																				if (typeof Headers.prototype.forEach === 'function') {
																								response.headers.forEach(function (value, name) {
																												headers[name] = value;
																								});
																				} else if (typeof Headers.prototype.keys === 'function') {
																								var keys = response.headers.keys();
																								var _iteratorNormalCompletion = true;
																								var _didIteratorError = false;
																								var _iteratorError = undefined;

																								try {
																												for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
																																var key = _step.value;

																																headers[key] = response.headers.get(key);
																												}
																								} catch (err) {
																												_didIteratorError = true;
																												_iteratorError = err;
																								} finally {
																												try {
																																if (!_iteratorNormalCompletion && _iterator['return']) {
																																				_iterator['return']();
																																}
																												} finally {
																																if (_didIteratorError) {
																																				throw _iteratorError;
																																}
																												}
																								}
																				} else {
																								headers = response.headers;
																				}

																				var responsePayload = {
																								data: json,
																								headers: headers,
																								method: config.method ? config.method.toLowerCase() : 'get',
																								statusCode: response.status
																				};

																				if (response.status >= 200 && response.status < 300) {
																								return responsePayload;
																				}

																				var error = new Error(response.statusText);
																				error.response = responsePayload;
																				throw error;
																});
												});
								});
				};
};

module.exports = exports['default'];