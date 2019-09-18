import chai from "chai";
const expect = chai.expect;
import Booking from "../src/Booking.js";

let booking, data;

before(() => {
  data = {
    userID: 101,
    date: "2019/09/18",
    roomNumber: 45
  };
  booking = new Booking(data);
});

describe("Booking", () => {
  it("should be an instance of Booking", () => {
    expect(Booking).to.be.a("function");
    expect(booking).to.be.an.instanceof(Booking);
  });

  it("should hold data", () => {
    expect(booking).to.eql({
      userID: 101,
      date: "2019/09/18",
      roomNumber: 45
    });
  });
});
