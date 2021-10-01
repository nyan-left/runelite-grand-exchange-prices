import * as chai from "chai";
import * as API from "../src/index";

describe("/latest endpoint", () => {
  it("resolves more than 3000 items", async () => {
    const test = await API.latest();
    chai.expect(Object.keys(test)).to.be.an("array").that.has.length.above(3000);
  });
});

describe("/id endpoint", () => {
  it("resolves an item", async () => {
    const test = await API.id(4151);
    console.log(test);
    chai.expect(test).to.have.property("4151");
  });
});
