const request = require("supertest")
const expect = require("chai").expect
const register = require('../testdata/register.json')
const login = require('../testdata/login.json')
const update = require('../testdata/updateuser.json')

describe("Anetiquette TDD test", ()=>{
    const baseurl = "http://localhost:4000/api/v1"
    const baseurl2 = "http://localhost:4000/"
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
    it('should log the user with given credentials in', (done)=>{
        request(baseurl)
            .post('/login')
            .send(login)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.user.email).to.be.equal(login.email)
                expect(res.body.token).not.to.be.null;
                userId = res.body.userId;
                token = res.body.token;
                if (err){
                    throw err
                }
                done()
            })
    })
    it('should fetch the user of the provided user id', (done)=>{
        request(baseurl)
            .get('/show')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200)
                if(err){
                    throw err
                }
                done()
            })
    })
    it('should update the user credentials', (done)=>{
        request(baseurl)
            .put('/update')
            .send(update)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200)
                // expect(res.body.user.name).to.be.equal(update.name) 
                // expect(res.body.user.email).to.be.equal(update.email)
                if(err){
                    throw err
                }
                done()
            })
    })
    it('should add product items', (done)=>{
        request(baseurl2)
            .put('/product/add')
            .send(update)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200)
                // expect(res.body.user.name).to.be.equal(update.name) 
                // expect(res.body.user.email).to.be.equal(update.email)
                if(err){
                    throw err
                }
                done()
            })
    })
    

})
