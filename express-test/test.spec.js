const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const Item = require("../models").products;

chai.use(chaiHttp);
const expect = chai.expect;

describe("product", () => {
  let product;
  beforeEach(async () => {
    product = {
      title: "Test",
      price: 99.99,
      description: "djjxnjnkenskcnsk",
      published: true,
    };
  });

  after(async () => {
    await Item.destroy({
      where: {},
      truncate: true,
    });
  });

  describe("/GET item", () => {
    it("it should GET all the items", (done) => {
      chai
        .request(app)
        .get("/bajaj/products/allProducts")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const res = await chai
        .request(app)
        .post("/bajaj/products/addProduct")
        .send({
          title: "Test",
          price: 99.99,
          description: "djjxnjnkenskcnsk",
          published: true,
        });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("title", "Test");
      expect(res.body).to.have.property("price", 99.99);
    });
  });

  describe("PUT bajaj/products/:id item", () => {
    it("it should UPDATE an item by the given id", async () => {
      const newItem = new Item(product);
      newItem.save().then(() => {
        chai
          .request(server)
          .put(`/bajaj/products/${newItem.id}`)
          .send({
            title: "Test",
            price: 99.99,
            description: "djjxnjnkenskcnsk",
            published: true,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("description")
              .eql(product.description);
            res.body.should.have.property("price").eql(product.price);
          });
      });
    });
  });

  describe("DELETE bajaj/products/:id", () => {
    it("should delete an existing item", async () => {
      const item = await Item.create({
        title: "TEST",
        price: 99.99,
        description: "djjxnjnkenskcnsk",
        published: true,
      });

      const res = await chai.request(app).delete(`/bajaj/products/${item.id}`);
      expect(res).to.have.status(200);
    });

    it("should return 404 for non-existent item", async () => {
      const res = await chai.request(app).delete("/items/1");
      expect(res).to.have.status(404);
    });
  });
});
