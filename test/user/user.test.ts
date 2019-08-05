import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/Api';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Users test', () => {
    beforeEach((done) => { //clear all the users before each test
        return chai.request(app).del('/users')
            .then(res => {
                expect(res.status).to.equal(410);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done()
            });    
    });

    it('it should through an error user not found', () => {
        return chai.request(app).post('/register')
            .send({ email: 'vinsonpeter8@gmail.com', names: 'Vincent Peter', password: 'password' })
            .then(res => {
                expect(res.status).to.equal(422);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });
    it('responds with 201 upon adding new customer role', () => {
        return chai.request(app).post('/levels')
            .send({ email: 'vinsonpeter8@gmail.com', names: 'Vincent Peter', password: 'password' })
            .then(res => {
                expect(res.status).to.equal(422);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });
    it('responds with user upon registering in', () => {
        return chai.request(app).post('/register')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.length(5);
            });
    });
    it('should respond', () => {
        return chai.request(app).get('/api/v1/heroes')
            .then(res => {
                let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
                expect(Wolverine).to.exist;
                expect(Wolverine).to.have.all.keys([
                    'id',
                    'name',
                    'aliases',
                    'occupation',
                    'gender',
                    'height',
                    'hair',
                    'eyes',
                    'powers'
                ]);
            });
    });
    describe('GET api/v1/heroes/:id', () => {

        it('responds with single JSON object', () => {
            return chai.request(app).get('/api/v1/heroes/1')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                });
        });
        it('should return Luke Cage', () => {
            return chai.request(app).get('/api/v1/heroes/1')
                .then(res => {
                    expect(res.body.hero.name).to.equal('Luke Cage');
                });
        });
    });
});