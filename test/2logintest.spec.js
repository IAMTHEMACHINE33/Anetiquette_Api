// const request = require("supertest")
// const expect = require("chai").expect
// const login = require('../testdata/login.json')

// describe("Login TDD test", ()=>{
//     const baseurl = "http://localhost:4000/api/v1"
//     var userId
//     var token
//     it('should log the user with given credentials in', (done)=>{
//         request(baseurl)
//             .post('/login')
//             .send(login)
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .end(function(err, res){
//                 expect(res.statusCode).to.be.equal(200)
//                 expect(res.body.user.email).to.be.equal(login.email)
//                 userId = res.body.userId;
//                 if (err){
//                     throw err
//                 }
//                 done()
//             })
//     })

// })

