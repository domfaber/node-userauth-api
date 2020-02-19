const { User } = require("../models/users.model");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
var UsersController = require('../controllers/users.controller.js');


describe("drop users db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  after(async () => {
    await User.deleteMany({});
  });

/*
  auth/signup route testing

  1) test singup with new email and password
  2) test signup with existing email
  3) test signup with wrong password format

*/
  describe("/auth/signup with valid parameters", () => {
    it("should return user_id as json", async () => {

      const res = await request(app)
        .post("/auth/signup")
        .send({
          email: "test@gmail.com",
          password: "testpassword"
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");

    });
  });

  describe("/auth/signup with already existing email", () => {
    it("should return 404 and error message", async () => {

      const userData = { email: "test@gmail.com", password: "testpassword"};
      let user = new User(userData);
      await user.save();

      const res = await request(app)
        .post("/auth/signup")
        .send({
          email: "test@gmail.com",
          password: "testpassword"
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("errormessage");

    });
  });

  describe("/auth/signup with just an email and no password", () => {
    it("should return 404", async () => {

      const res = await request(app)
        .post("/auth/signup")
        .send({email: "test@gmail.com"});
        expect(res.status).to.equal(400);
    });
  });

  describe("/auth/signin with correct email and password", () => {
    it("should return _id and token", async () => {

      const userData = { email: "test250@gmail.com", password: "testpassword"};
      let user = new User(userData);
      await user.save();

      console.log("User in db"+User.findOne({email: "test250@gmail.com"}));
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: "test250@gmail.com",
          password: "testpassword"
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("userId");
        expect(res.body).to.have.property("token");

    });
  });


});

/* example to copy from

  describe("/GET", () => {
    it("should return all users", async () => {
      const users = [
        { name: "test", email: "testadsfadsfad@gmail.com", gender: "male" },
        { name: "test5", email: "test1@gmail.com", gender: "female" }
      ];
      await User.insertMany(users);
      console.log(users);
      const res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });
*/
