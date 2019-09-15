import chai from "chai";
import spies from "chai-spies";
import Hotel from "../src/Hotel.js";
import bookings from "../data/bookings.js";
import rooms from "../data/rooms.js";
import roomServices from "../data/roomServices.js";
import users from "../data/users.js";
import domUpdates from "../src/domUpdates.js";
const expect = chai.expect;
chai.use(spies);
chai.spy.on(
  domUpdates,
  [
    "displayPercentageOfBookings",
    "displayBookingRevenueToday",
    "displayRoomsAvailableToday",
    "displayDailyBookedRooms"
  ],
  () => {}
);

let hotel;

beforeEach(() => {
  let date = "2019/07/28";
  console.log("users", users);
  hotel = new Hotel(users, rooms, bookings, roomServices, date);
  console.log("hotel", hotel);
});

describe("Hotel", () => {
  it("should be an instance of Hotel", () => {
    expect(Hotel).to.be.a("function");
    expect(hotel).to.be.an.instanceof(Hotel);
  });
});
