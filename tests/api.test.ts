import * as API from '../src/index';
import * as chai from 'chai';

describe('hello world', () => {
  it('returns "hello world"', async () => {
    const test = await API.test();
    chai.expect(test).to.equal('hello world');
  });
});
