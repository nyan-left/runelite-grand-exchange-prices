import * as chai from "chai";
import * as API from "../src/index";

describe("/latest endpoint", () => {
  it("resolves all items", async () => {
    const latestTransactions = await API.latest({
      useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests",
    });
    chai.expect(Object.keys(latestTransactions)).to.be.an("array").that.has.length.above(3000);
  });

  it("resolves a specific item", async () => {
    const transactionData = await API.latest({
      id: 4151,
      useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests",
    });
    chai.expect(transactionData).to.have.property("high");
    chai.expect(transactionData).to.have.property("highTime");
    chai.expect(transactionData).to.have.property("low");
    chai.expect(transactionData).to.have.property("lowTime");
  });
});

describe("/mapping endpoint", () => {
  it("resolves the mapping data", async () => {
    const mappingData = await API.mapping({ useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests" });
    chai.expect(mappingData).to.have.property("4151");
  });

  it("resolves specific item", async () => {
    const mappingData = await API.mapping({
      id: 4151,
      useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests",
    });
    chai.expect(mappingData.examine).to.be.equal("A weapon from the abyss.");
  });
});

describe("/5min endpoint", () => {
  it("resolves the 5min data", async () => {
    const minData = await API.min5({ useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests" });
    chai.expect(minData).to.have.property("4151");
  });

  it("resolves specific item", async () => {
    const minData = await API.min5({ id: 4151, useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests" });
    chai.expect(minData).to.have.property("timestamp");
    chai.expect(minData).to.have.property("lowPriceVolume");
    chai.expect(minData).to.have.property("highPriceVolume");
    chai.expect(minData).to.have.property("avgHighPrice");
    chai.expect(minData).to.have.property("avgLowPrice");
  });
});

describe("/1hour endpoint", () => {
  it("resolves the 5min data", async () => {
    const minData = await API.hour1({ useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests" });
    chai.expect(minData).to.have.property("4151");
  });

  it("resolves specific item", async () => {
    const minData = await API.hour1({ id: 4151, useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests" });
    chai.expect(minData).to.have.property("timestamp");
    chai.expect(minData).to.have.property("lowPriceVolume");
    chai.expect(minData).to.have.property("highPriceVolume");
    chai.expect(minData).to.have.property("avgHighPrice");
    chai.expect(minData).to.have.property("avgLowPrice");
  });
});

describe("/timeseries endpoint", () => {
  it("resolves 300 timesteps", async () => {
    const timeseries = await API.timeseries({
      id: 4151,
      timestep: "5m",
      useragent: "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests",
    });
    chai.expect(timeseries).to.be.an("array").that.has.length(300);

    const timestep = timeseries[0];
    chai.expect(timestep).to.have.property("timestamp");
    chai.expect(timestep).to.have.property("lowPriceVolume");
    chai.expect(timestep).to.have.property("highPriceVolume");
    chai.expect(timestep).to.have.property("avgHighPrice");
    chai.expect(timestep).to.have.property("avgLowPrice");
  });
});
