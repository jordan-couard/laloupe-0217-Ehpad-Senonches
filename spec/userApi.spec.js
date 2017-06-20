const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    admin,
    admin_token,
    user,
    user_token;

describe('API USER', function() {

  it('should connect admin', function(done) {
    request(app)
      .post('/login')
      .send({
        email: "admin@mail.com",
        password: '12345'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        admin = res.body.user;
        admin_token = res.body.token;
        assert.equal(admin.email, "admin@mail.com");
        done();
      });
  });

  it('admin should create a user', function(done) {
    request(app)
      .post('/users')
      .set('Authorization', admin_token)
      .send({
        email: "user@mail.fr",
        password: 'azerty',
        Name: 'Test',
        Firstname: 'test'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        user = res.body.user;
        assert.equal(user.email, "user@mail.fr");
        done();
      });
  });

  it('admin should delete user', function(done) {
    request(app)
      .delete('/users/' + user._id)
      .set('Authorization', admin_token)
      .expect(200, done);
  });

  it('user should connect', function(done) {
    request(app)
    .post('/login')
    .send({
      email: "jcou@gmi.fr",
      password: "12345"
    })
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      user = res.body.user;
      assert.equal(user.email, "jcou@gmi.fr");
      done();
    });
  });
  // 
  // it("return all event", function(done){
  //   request(app)
  //   .get('/evenements')
  //   .expect(200);
  //   assert.equal(evenement.findAll, "evenement" );
  //   done();
  // });
  //
  // it("return one event", function(done){
  //   request(app)
  //   .get('/evenements/' + evenement._id)
  //   .expect(200);
  //   assert.equal(evenements.finfById, "evenement" );
  //   done();
  // });
});
