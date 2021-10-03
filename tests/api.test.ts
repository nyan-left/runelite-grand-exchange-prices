import * as chai from "chai";
import * as API from "../src/index";

describe("/latest endpoint", () => {
  it("resolves all items", async () => {
    const latestTransactions = await API.latest();
    chai.expect(Object.keys(latestTransactions)).to.be.an("array").that.has.length.above(3000);
  });

  it("resolves a specific item", async () => {
    const transactionData = await API.latest(4151);
    chai.expect(transactionData).to.have.property("high");
    chai.expect(transactionData).to.have.property("highTime");
    chai.expect(transactionData).to.have.property("low");
    chai.expect(transactionData).to.have.property("lowTime");
  });
});

describe("/mapping endpoint", () => {
  it("resolves the mapping data", async () => {
    const mappingData = await API.mapping();
    chai.expect(mappingData).to.have.property("4151");
  });

  it("resolves specific item", async () => {
    const mappingData = await API.mapping(4151);
    chai.expect(mappingData.examine).to.be.equal("A weapon from the abyss.");
  });
});
