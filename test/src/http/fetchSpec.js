import { expect } from 'chai';
import fetchBackend from '../../../src/http/fetch';
import sinon from 'sinon';

describe('Fetch HTTP Backend', () => {
    let httpBackend;
    let fetch;
    let response;

    global.Headers = () => {}
    global.Headers.prototype.keys = () => {}

    beforeEach(() => {
        response = {
            headers: {
                keys: sinon.stub().returns(['test']),
                get: sinon.stub().returns('here'),
            },
            text: sinon.stub().returns(Promise.resolve(JSON.stringify({ content: 'Yes' }))),
            status: 200,
        };
        fetch = sinon.stub().returns(Promise.resolve(response));
        httpBackend = fetchBackend(fetch);
    });

    it('should map config to be compatible with fetch package', () => {
        var request1 = httpBackend({
            data: {
                me: 'you',
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: {
                asc: 1,
            },
			url: Promise.resolve('/url'),
        })
		.then(() => {
			expect(fetch.getCall(0).args).to.deep.equal([
	            '/url?asc=1',
	            {
	                body: '{"me":"you"}',
	                headers: {
	                    'Content-Type': 'application/json;charset=UTF-8',
	                },
	            },
	        ]);
		});

        var request2 = httpBackend({
            data: {
                me: 'you',
            },
            headers: {},
            params: {
                asc: 1,
            },
			url: Promise.resolve('/url'),
        })
		.then(() => {
			expect(fetch.getCall(1).args).to.deep.equal([
	            '/url?asc=1',
	            {
	                body: {
	                    me: 'you',
	                },
	                headers: {},
	            },
	        ]);
		});

		return Promise.all([ request1, request2 ]);
    });

    it('should correctly format the response when it succeed', (done) => {
        httpBackend({
            data: {
                me: 'you',
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: {
                asc: 1,
            },
			url: Promise.resolve('/url'),
        })
        .then((response) => { // eslint-disable-line no-shadow
            expect(response).to.deep.equal({
                data: {
                    content: 'Yes',
                },
                headers: {
                    test: 'here',
                },
                method: 'get',
                statusCode: 200,
            });

            done();
        })
        .catch(done);
    });

    it('should correctly format the response when it succeed and returns 204 as status code', (done) => {
        response.status = 204;
        httpBackend({
            data: {
                me: 'you',
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: {
                asc: 1,
            },
			url: Promise.resolve('/url'),
        })
        .then((_response) => {
            expect(_response).to.deep.equal({
                data: {
                    content: 'Yes',
                },
                headers: {
                    test: 'here',
                },
                method: 'get',
                statusCode: 204,
            });

            expect(response.text.callCount).to.equal(1);
            done();
        })
        .catch(done);
    });

    it('should correctly format the error when it fails', (done) => {
        response.status = 404;
        response.statusText = 'Not Found';

        httpBackend({
            data: {
                me: 'you',
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: {
                asc: 1,
            },
			url: Promise.resolve('/url'),
        })
        .then(done.bind(done, ['It should throw an error']), (error) => {
            expect(error.message).to.equal('Not Found');
            expect(error.response).to.deep.equal({
                data: {
                    content: 'Yes',
                },
                headers: {
                    test: 'here',
                },
                method: 'get',
                statusCode: 404,
            });

            done();
        })
        .catch(done);
    });

	it('should correctly stringify the request body', () => {
		httpBackend({
			data: {
				'array': [
					'element1',
					'element2'
				],
				'object': {
					'element1': {
						'k1': 'v1',
						'k2': 'v2'
					}
				}
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: Promise.resolve('/url'),
		})
		.then(() => {
			expect(fetch.getCall(0).args).to.deep.equal([
				'/url',
	            {
	                body: encodeURI('array[]=element1&array[]=element2&object[element1][k1]=v1&object[element1][k2]=v2'),
	                headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
	                },
	            },
			]);
		});
	});

    it('should correctly stringify the query string', () => {
        var request1 = httpBackend({
            data: {
                me: 'you',
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: {
                asc: 1,
                fields: [
                    'name',
                    'firstname',
                    'email',
                ],
            },
			url: Promise.resolve('/url'),
        })
		.then(() => {
			expect(fetch.getCall(0).args).to.deep.equal([
	            encodeURI('/url?asc=1&fields[]=name&fields[]=firstname&fields[]=email'),
	            {
	                body: '{"me":"you"}',
	                headers: {
	                    'Content-Type': 'application/json;charset=UTF-8',
	                },
	            },
	        ]);
		});

        var request2 = httpBackend({
            data: {
                me: 'you',
            },
            headers: {},
            params: {},
			url: Promise.resolve('/url'),
        })
		.then(() => {
			expect(fetch.getCall(1).args).to.deep.equal([
	            '/url',
	            {
	                body: {
	                    me: 'you',
	                },
	                headers: {},
	            },
	        ]);
		});

		return Promise.all([ request1, request2 ]);
    });
});
