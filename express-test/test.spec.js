const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);
describe("Get item", () => {
  it("Should fetch all the items to bajaj-task db", (done) => {
    chai
      .request(server)
      .get("/bajaj/products/allProducts")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("Post item", () => {
  it("should post an item to bajaj-task db", (done) => {
    const item = {
      title: "Bajaj-Fin",
      price: 9999,
      description: "task",
      published: true,
    };

    chai
      .request(server)
      .post("/bajaj/products/addProduct")
      .send(item)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("Update item", () => {
  it("should update an item in the database", (done) => {
    const item = {
      id: 1,
      title: "Byte",
      price: 7777,
      description: "pune",
      published: true,
    };

    chai
      .request(server)
      .put("/bajaj/products/" + item.id)
      .send(item)
      .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a("object");

        done();
      });
  });
});

describe("Delete item", () => {
  it("should delete an item in the database", (done) => {
    chai
      .request(server)
      .delete("/bajaj/products/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.equal("Product is deleted !");
        done();
      });
  });
});
