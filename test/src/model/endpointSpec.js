import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
var expect = chai.expect;
chai.use( chaiAsPromised );

import endpointModel from '../../../src/model/endpoint';
import { Map } from 'immutable';
import scopeModel from '../../../src/model/scope';
import sinon from 'sinon';

/* eslint-disable new-cap */
describe('Endpoint model', () => {
    let endpoint;
    let request;
    let scope;

    beforeEach(() => {
        request = sinon.stub().returns(Promise.resolve(Map({
            data: { result: true },
        })));

        scope = scopeModel();
        scope.push('path', 'url');
        scope.assign('config', 'entityIdentifier', 'id');
        sinon.spy(scope, 'on');
        endpoint = endpointModel(request)(scope);
    });

    describe('get', () => {
        it('should call request with correct config when called with no argument', () => {
            endpoint.get();

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with params and headers', () => {
            endpoint.get({ filter: 'asc' }, { Authorization: 'Token xxxx' });

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					Authorization: 'Token xxxx',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
					filter: 'asc',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');

        });
    });

    describe('post', () => {
        it('should call request with correct config when called with only data', () => {
            endpoint.post([
                'request',
                'data',
            ]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
                    'request',
                    'data',
                ]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'POST');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with data and headers', () => {
            endpoint.post([
                'request',
                'data',
            ], {
                goodbye: 'planet',
            }, {
                hello: 'world',
            });

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
                    'request',
                    'data',
                ]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
					hello: 'world',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'POST');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
					goodbye: 'planet',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('put', () => {
        it('should call request with correct config when called with only data', () => {
            endpoint.put([
                'request',
                'data',
            ]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
                    'request',
                    'data',
                ]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'PUT');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with data and headers', () => {
            endpoint.put([
                'request',
                'data',
            ], {
                goodbye: 'planet',
            }, {
                hello: 'world',
            });

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
                    'request',
                    'data',
                ]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
                    'Content-Type': 'application/json;charset=UTF-8',
                    hello: 'world',
                });
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'PUT');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
                    goodbye: 'planet',
                });
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('patch', () => {
        it('should call request with correct config when called with only data', () => {
            endpoint.patch([
                'request',
                'data',
            ]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
                    'request',
                    'data',
                ]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
                    'Content-Type': 'application/json;charset=UTF-8',
                });
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'PATCH');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with data and headers', () => {
            endpoint.patch([
                'request',
                'data',
            ], {
                goodbye: 'planet',
            }, {
                hello: 'world',
            });

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
					'request',
					'data',
				]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
					hello: 'world',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'PATCH');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
                    goodbye: 'planet',
                });
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('delete', () => {
        it('should call request with correct config when called with only data', () => {
            endpoint.delete([
                'request',
                'data',
            ]);

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
					'request',
					'data',
				]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'DELETE');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with data and headers', () => {
            endpoint.delete([
                'request',
                'data',
            ], {
                goodbye: 'planet',
            }, {
                hello: 'world',
            });

			expect(request.getCall(0).args[0].toJS()).to.have.property('data')
				.that.deep.equal([
					'request',
					'data',
				]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					'Content-Type': 'application/json;charset=UTF-8',
					hello: 'world',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'DELETE');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
					goodbye: 'planet',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('head', () => {
        it('should call request with correct config when called with no argument', () => {
            endpoint.head();

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'HEAD');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should call request with correct config when called with params and headers', () => {
            endpoint.head({ filter: 'asc' }, { Authorization: 'Token xxxx' });

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					Authorization: 'Token xxxx',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'HEAD');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params')
				.that.deep.equal({
					filter: 'asc'
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('interceptors', () => {
        it('should add a request interceptor and pass it to the request callback when one request is performed', () => {
            endpoint.addRequestInterceptor({ hello: 'world' });

            endpoint.get();

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([{ hello: 'world' }]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should add a response interceptor and pass it to the request callback when one request is performed', () => {
            endpoint.addResponseInterceptor({ hello2: 'world2' });

            endpoint.get();

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([{ hello2: 'world2' }],);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should add a error interceptor and pass it to the request callback when one request is performed', () => {
            endpoint.addErrorInterceptor({ hello3: 'world3' });

            endpoint.get();

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([{ hello3: 'world3' }]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });
    });

    describe('headers', () => {
        it('should add an header to all request done by the endpoint when header is called', () => {
            endpoint.header('Authorization', 'xxxx');
            endpoint.get(null, { hello: 'world' });

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					Authorization: 'xxxx',
                    hello: 'world',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');
        });

        it('should override existing headers when performing a request with the same header name', () => {
            endpoint.header('Authorization', 'xxxx');
            endpoint.get(null, { Authorization: 'yyyy' });

			expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
				.that.deep.equal({
					Authorization: 'yyyy',
				});
			expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'GET');
			expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
			expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(request.getCall(0).args[0].toJS()).to.have.property('url')
				.that.eventually.equal('/url');
        });
    });

    it('should return the endpoint url when url is called', () => {
		expect( endpoint.url ).to.eventually.equal('/url');
    });

    it('should create a child endpoint when new is called with a child scope', () => {
        const childEndpoint = endpoint.new('/url2');

		expect( childEndpoint.url ).to.eventually.equal('/url2');

        endpoint.header('Authorization', 'xxxx');
        endpoint.header('hello', 'world');
        endpoint.addRequestInterceptor({ alpha: 'beta' });

        childEndpoint.header('hello', 'planet');
        childEndpoint.addResponseInterceptor({ omega: 'gamma' });

        childEndpoint.post({ content: 'test' });

		expect(request.getCall(0).args[0].toJS()).to.have.property('data')
			.that.deep.equal({ content: 'test' });
		expect(request.getCall(0).args[0].toJS()).to.have.property('errorInterceptors')
			.that.deep.equal([]);
		expect(request.getCall(0).args[0].toJS()).to.have.property('headers')
			.that.deep.equal({
                Authorization: 'xxxx',
                'Content-Type': 'application/json;charset=UTF-8',
                hello: 'planet',
            });
		expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'POST');
		expect(request.getCall(0).args[0].toJS()).to.have.property('params', null);
		expect(request.getCall(0).args[0].toJS()).to.have.property('requestInterceptors')
			.that.deep.equal([{
				alpha: 'beta'
			}]);
		expect(request.getCall(0).args[0].toJS()).to.have.property('responseInterceptors')
			.that.deep.equal([{
				omega: 'gamma'
			}]);
		expect(request.getCall(0).args[0].toJS()).to.have.property('method', 'POST');
    });

    it('should emit a response event when a response is received', (done) => {
        const listener = sinon.spy();
        endpoint.on('response', listener);

        endpoint.get().then((response) => {
            expect(listener.getCall(0).args[0].body(false)).to.deep.equal({
                result: true,
            });

			expect(listener.getCall(0).args[1]).to.have.property('errorInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args[1]).to.have.property('headers')
				.that.deep.equal({});
			expect(listener.getCall(0).args[1]).to.have.property('method', 'GET');
			expect(listener.getCall(0).args[1]).to.have.property('params', null);
			expect(listener.getCall(0).args[1]).to.have.property('requestInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args[1]).to.have.property('responseInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args[1]).to.have.property('url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');

            expect(response.body(false)).to.deep.equal({
                result: true,
            });

            done();
        }).catch(done);
    });

    it('should emit a error event when an error response is received', (done) => {
        const listener = sinon.spy();
        endpoint.on('error', listener);
        request.returns(Promise.reject(new Error('Oops')));

        endpoint.get().then(done.bind(done, ['It should throw an error']), (error) => {

			expect(listener.getCall(0).args).to.have.deep.property('[0]')
				.that.deep.equal(new Error('Oops'));
			expect(listener.getCall(0).args).to.have.deep.property('[1].errorInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].headers')
				.that.deep.equal({});
			expect(listener.getCall(0).args).to.have.deep.property('[1].method', 'GET');
			expect(listener.getCall(0).args).to.have.deep.property('[1].params', null);
			expect(listener.getCall(0).args).to.have.deep.property('[1].requestInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].responseInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].url')
				.that.is.a('Promise')
				.and.eventually.equal('/url');

            expect(error.message).to.equal('Oops');
            done();
        }).catch(done);
    });

    it('should emit event across parent endpoints', (done) => {
        const listener = sinon.spy();
        const childEndpoint = endpoint.new('child');
        endpoint.on('error', listener);

        request.returns(Promise.reject(new Error('Oops')));

		childEndpoint.get().then(done.bind(done, ['It should throw an error']), (error) => {

			expect(listener.getCall(0).args).to.have.deep.property('[0]')
				.that.deep.equal(new Error('Oops'));
			expect(listener.getCall(0).args).to.have.deep.property('[1].errorInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].headers')
				.that.deep.equal({});
			expect(listener.getCall(0).args).to.have.deep.property('[1].method', 'GET');
			expect(listener.getCall(0).args).to.have.deep.property('[1].params', null);
			expect(listener.getCall(0).args).to.have.deep.property('[1].requestInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].responseInterceptors')
				.that.deep.equal([]);
			expect(listener.getCall(0).args).to.have.deep.property('[1].url')
				.that.is.a('Promise')
				.and.eventually.equal('child');

            expect(error.message).to.equal('Oops');
            done();
        }).catch(done);
    });

    it('should register a default error listener', () => {
        expect(scope.on.getCall(0).args[0]).to.equal('error');
    });
});
