import * as chai from "chai";
import * as API from "../src/index";

describe("hello world", () => {
  it('returns "hello world"', async () => {
    const test = await API.test();
    chai.expect(test).to.equal("hello world");
  });
});
