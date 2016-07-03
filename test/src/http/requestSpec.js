import sinon from 'sinon';
import 'sinon-as-promised';
import chai from 'chai';

import chaiAsPromised from 'chai-as-promised';
chai.use( chaiAsPromised );

chai.should();
var expect = chai.expect;
import requestBackend from '../../../src/http/request';

describe('Request HTTP Backend', () => {
    let httpBackend;
    let request;

    it('should map config to be compatible with request package', () => {

		request = sinon.spy((config, cb) => {
			cb(null, {statusCode: 200}, null);
		});
		httpBackend = requestBackend(request);

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
        }).then(() => {
			expect(request.getCall(0).args[0]).to.deep.equal({
	            form: '{"me":"you"}',
	            headers: {
	                'Content-Type': 'application/json;charset=UTF-8',
	            },
	            qs: {
	                asc: 1,
	            },
	            url: '/url',
	        });
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
		}).then(() => {
			expect(request.getCall(1).args[0]).to.deep.equal({
				form: {
			        me: 'you',
			    },
			    headers: {},
			    qs: {
			        asc: 1,
			    },
			    url: '/url',
			});
		});

		return Promise.all([request1, request2]);
	});

    it('should correctly format the response when it succeed', () => {

		request = sinon.spy((config, cb) => {
			cb(null, {
	            headers: {
	                test: 'here',
	            },
	            statusCode: 200,
	        }, '{"content":"Yes"}');
		});
		httpBackend = requestBackend(request);

        return httpBackend({
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
        }).then((response) => {
            expect(response).to.deep.equal({
                data: {
                    content: 'Yes',
                },
                headers: {
                    test: 'here',
                },
                statusCode: 200,
            });
        });
    });

    it('should correctly format the error when it fails', (done) => {

		request = sinon.spy((config, cb) => {
			cb(null, {
	            headers: {
	                test: 'here',
	            },
	            statusCode: 404,
	            statusMessage: 'Not Found',
	        }, '{"content":"Yes"}');
		});
		httpBackend = requestBackend(request);

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
                statusCode: 404,
            });
			done();
        }).catch(done);
    });
});
