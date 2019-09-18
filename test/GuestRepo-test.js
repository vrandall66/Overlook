import GuestRepo from "../src/GuestRepo.js";
import chai from "chai";
const expect = chai.expect;
import allData from "../data/allData.js";

let guestRepo;

before(() => {
  guestRepo = new GuestRepo(allData.customers.customers);
});

describe("GuestRepo", () => {
  it("should be an instance of GuestRepo", () => {
    expect(GuestRepo).to.be.a("function");
    expect(guestRepo).to.be.an.instanceof(GuestRepo);
  });

  it("should instantiate Room Guest data", () => {
    expect(guestRepo.createFromData).to.be.a("function");
    expect(guestRepo.createFromData(allData.customers).length).to.equal(100);
  });
});
