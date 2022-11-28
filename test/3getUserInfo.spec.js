// const request = require('supertest');
// const expect = require('chai').expect;

// describe('Get API tests using supertest', () => {
// 	const baseurl = 'http://localhost:4000/api/v1';
//     it('should fetch user data of the provided user id', (done) => {
// 		request(baseurl)
// 			.get('/show')
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(500);
//                 if(err){
//                     throw err;
//                 }
// 				done();
// 			});
// 	});
// 	it('should successfully pass the test for get api without query param', (done) => {
// 		request(baseurl)
// 			.get('/api/users/2')
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(200);
// 				expect(res.body.data.id).to.be.equal(2);
// 				expect(res.body.data.first_name).to.be.equal('Janet');
// 				done();
// 			});
// 	});

// 	it('should successfully pass the test for get api with path param', (done) => {
// 		let param = 1;
// 		request('https://fakerestapi.azurewebsites.net')
// 			.get('/api/v1/Authors/' + param)
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(200);
// 				expect(res.body.id).to.be.equal(1);
// 				done();
// 			});
// 	});
// });