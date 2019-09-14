import chai from "chai";
import spies from "chai-spies";
import Hotel from "../src/Hotel.js";
import bookings from "../data/bookings.js";
import rooms from "../data/rooms.js";
import roomServices from "../data/roomServices.js";
import users from "../data/users.js";
const expect = chai.expect;
chai.use(spies);

let hotel;

beforeEach(() => {
  let date = '2019/07/28';
  let data = {
    customers: users,
    rooms,
    bookings,
    roomServices
  };
  hotel = new Hotel(data.customers, rooms, bookings, roomServices, date);
});

describe("Hotel", () => {
  it("should be an instance of Hotel", () => {
    expect(Hotel).to.be.a("function");
    expect(hotel).to.be.an.instanceof(Hotel);
  });
});