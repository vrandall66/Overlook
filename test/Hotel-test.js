import chai from "chai";
import Hotel from "../src/Hotel.js";
import allData from "../data/allData.js";
const expect = chai.expect;

let hotel;

beforeEach(() => {
  let date = "2019/07/28";
  let data = allData;
  hotel = new Hotel(
    data.customers,
    data.rooms,
    data.bookings,
    data.roomServices,
    date
  );
});

describe("Hotel", () => {
  it("should be an instance of Hotel", () => {
    expect(Hotel).to.be.a("function");
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it("should have guests", () => {
    expect(hotel.guests).to.eql({ id: undefined, name: undefined });
  });
});
