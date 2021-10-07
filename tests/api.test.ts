import * as chai from "chai";
import * as API from "../src/index";

const useragent = "https://github.com/nyan-left/runelite-grand-exchange-prices automated tests";

describe("/latest endpoint", () => {
  it("resolves all items", async () => {
    const latestTransactions = await API.latest({
      useragent,
    });
    chai.expect(Object.keys(latestTransactions)).to.be.an("array").that.has.length.above(3000);
  });

  it("resolves a specific item", async () => {
    const request = await API.latest({ id: 4151, useragent });
    const transaction = request["4151"];

    chai.expect(transaction).to.have.property("high");
    chai.expect(transaction).to.have.property("highTime");
    chai.expect(transaction).to.have.property("low");
    chai.expect(transaction).to.have.property("lowTime");
  });
});

describe("/mapping endpoint", () => {
  it("resolves the mapping data", async () => {
    const mappingData = await API.mapping({ useragent });
    chai.expect(mappingData).to.have.property("4151");
  });
});

describe("/5min endpoint", () => {
  it("resolves the 5min data", async () => {
    const minData = await API.prices5Min({ useragent });
    chai.expect(minData).to.have.property("4151");
  });
});

describe("/1hour endpoint", () => {
  it("resolves the 1hour data", async () => {
    const minData = await API.prices1Hour({ useragent });
    chai.expect(minData).to.have.property("4151");
  });
});

describe("/timeseries endpoint", () => {
  it("resolves 300 timesteps", async () => {
    const timeseries = await API.timeseries({ id: 4151, timestep: "5m", useragent });
    chai.expect(timeseries).to.be.an("array").that.has.length(300);

    const timestep = timeseries[0];
    chai.expect(timestep).to.have.property("timestamp");
    chai.expect(timestep).to.have.property("lowPriceVolume");
    chai.expect(timestep).to.have.property("highPriceVolume");
    chai.expect(timestep).to.have.property("avgHighPrice");
    chai.expect(timestep).to.have.property("avgLowPrice");
  });
});
