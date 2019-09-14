import chai from 'chai';
const expect = chai.expect;
import Guest from '../src/Guest.js';

let guest;

beforeEach(() => {
  guest = new Guest('Vanessa Randall');
});

describe('Guest', () => {
  it('should be an instance of Guest', () => {
    expect(Guest).to.be.a('function');
    expect(guest).to.be.an.instanceof(Guest);
  })
})
