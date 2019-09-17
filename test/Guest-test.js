import chai from "chai";
const expect = chai.expect;
import Guest from "../src/Guest.js";

let guest;

beforeEach(() => {
  guest = new Guest({
    id: 56,
    name: "Ruth Veum"
  });
});

describe("Guest", () => {
  it("should be an instance of Guest", () => {
    expect(Guest).to.be.a("function");
    expect(guest).to.be.an.instanceof(Guest);
  });

  it("should have an ID", () => {
    expect(guest.id).to.equal(56);
  });

  it("should have a name", () => {
    expect(guest.name).to.equal("Ruth Veum");
  });
});
