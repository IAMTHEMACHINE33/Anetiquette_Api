const request = require("supertest")
const expect = require("chai").expect
const register = require('../testdata/register.json')

describe("Register TDD test", ()=>{
    const baseurl = "http://localhost:4000/api/v1"
    var userId
    var token
    it('should log the user with given credentials in', (done)=>{
        request(baseurl)
            .post('/register')
            .send(register)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(201)
                expect(res.body.user.name).to.be.equal(register.name)
                expect(res.body.user.email).to.be.equal(register.email)
                userId = res.body.userId;
                if (err){
                    throw err
                }
                done()
            })
    })
})
