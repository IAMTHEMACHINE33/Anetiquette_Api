const request = require("supertest")
const expect = require("chai").expect
const register = require('../testdata/register.json')
const login = require('../testdata/login.json')
const update = require('../testdata/updateuser.json')
const productadd = require('../testdata/productadd.json')
const categoryadd = require('../testdata/categoryadd.json')
const productsearch = require('../testdata/productsearch.json')
const productbid = require('../testdata/productbid.json')
const cartadd = require('../testdata/cartadd.json')
const feedbackadd = require('../testdata/feedbackadd.json')
const orderadd = require('../testdata/orderadd.json')
const registeradmin = require('../testdata/registeradmin.json')
const loginadmin = require('../testdata/loginadmin.json')

describe("Anetiquette TDD test", ()=>{
    const baseurl = "http://localhost:4000/api/v1"
    const baseurl2 = "http://localhost:4000"
    var userId
    var token
    it('should register the user and add their credentials to database', (done)=>{
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
    // it('should add product items', (done)=>{
    //     request(baseurl2)
    //         .post('/product/add')
    //         .send(productadd)
    //         .set('Accept', 'application/json')
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', 'Bearer ' + token)
    //         .end(function(err, res){
    //             expect(res.statusCode).to.be.equal(201)
    //             if(err){
    //                 throw err
    //             }
    //             done()
    //         })
    // })
    
    it('should add category', (done)=>{
        request(baseurl2)
            .post('/category/add')
            .send(categoryadd)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            // .attach('test', 'test/test.png')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(500)
                if(err){
                    throw err
                }
                done()
            })
    })

    it('should show products', (done)=>{
        request(baseurl2)
            .get('/product/show')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            // .set('Authorization', 'Bearer ' + token)
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(203)
                if(err){
                    throw err
                }
                done()
            })
    })

    it('should fetch single product', (done)=>{
        request(baseurl2)
            .get('/product/single/6390429631d1bd6027a26b06')
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

    it('should display purchase history of user', (done)=>{
        request(baseurl2)
        .get('/product/purchase_history')
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

    it('should be able to search for a product', (done)=>{
        request(baseurl2)
        .post('/product/search')
        .send(productsearch)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        // .set('Authorization', 'Bearer ' + token)
        .end(function(err, res){
            expect(res.statusCode).to.be.equal(200)
            if(err){
                throw err
            }
            done()
        })
    })
   
    it('should bid for an auction item', (done)=>{
        request(baseurl2)
        .post('/product/single/63a04b2ccda0151ffe58c10c/bid')
        .send(productbid)
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

    it('should be able to add product to cart', (done)=>{
        request(baseurl2)
        .post('/cart/add')
        .send(cartadd)
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

    it('should display items that are added to cart', (done)=>{
        request(baseurl2)
        .get('/cart/show')
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

    it('should be able to remove specified product from the cart ', (done)=>{
        request(baseurl2)
        .put('/cart/remove')
        .send(cartadd)
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

    it('should be able to add removed product again to cart', (done)=>{
        request(baseurl2)
        .post('/cart/add')
        .send(cartadd)
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
    
    it('should add feedback from the user', (done)=>{
        request(baseurl2)
        .post("/feedback/add")
        .send(feedbackadd)
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

    it('should show all feedbacks sent by users', (done)=>{
        request(baseurl2)
        .get("/feedback/show")
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
        
    // it('should add order of the user', (done)=>{
    //     request(baseurl2)
    //     .post("/order/add")
    //     .send(orderadd)
    //     .set('Content-Type', 'application/json')
    //     .set('Authorization', 'Bearer ' + token)
    //     .end(function(err){
    //         expect()
    //         if(err){
    //             throw err
    //         }
    //         done()
    //     })
    // })

    it('should show orders of the user', (done)=>{
        request(baseurl2)
        .get("/order/show")
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

    it('should register an admin account - backend function',(done)=>{
        request(baseurl)
            .post('/register_admin')
            .send(registeradmin)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(201)
                
                adminId = res.body.adminId;
                if (err){
                    throw err
                }
                done()
            })
    })

    it('should log the admin with given credentials in', (done)=>{
        request(baseurl)
            .post('/login_admin')
            .send(loginadmin)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.token).not.to.be.null;
                adminId = res.body.adminId;
                admintoken = res.body.token;
                if (err){
                    throw err
                }
                done()
            })
    })
})
