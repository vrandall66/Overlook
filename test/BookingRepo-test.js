import chai from "chai";
const expect = chai.expect;
import spies from "chai-spies";
chai.use(spies);
import BookingRepo from "../src/BookingRepo.js";
import data from "../data/allData.js";
import domUpdates from "../src/domUpdates.js";
chai.spy.on(
  domUpdates,
  [
    "displayPercentageOfBookings",
    "displayBookingRevenueToday",
    "displayRoomsAvailableToday",
    "displayDailyBookedRooms",
    "displayAvailableRoomsOnSpecifiedDate",
    "displayMostPopularBookingDay",
    "displayLeastPopularBookingDay"
  ],
  () => {}
);

let bookingRepo;

beforeEach(() => {
  bookingRepo = new BookingRepo(data.bookings);
});

describe("Booking", () => {
  it("should be an instance of Booking", () => {
    expect(BookingRepo).to.be.a("function");
    expect(bookingRepo).to.be.an.instanceof(BookingRepo);
  });

  it("should be able to find all available rooms for a given day", () => {
    expect(bookingRepo.findBookedRooms).to.be.a("function");
    expect(bookingRepo.findBookedRooms("2019/07/28")).to.eql([
      { date: "2019/07/28", roomNumber: 1, userID: 91 },
      { date: "2019/07/28", roomNumber: 2, userID: 87 },
      { date: "2019/07/28", roomNumber: 8, userID: 5 },
      { date: "2019/07/28", roomNumber: 10, userID: 94 },
      { date: "2019/07/28", roomNumber: 14, userID: 53 },
      { date: "2019/07/28", roomNumber: 17, userID: 62 },
      { date: "2019/07/28", roomNumber: 18, userID: 4 },
      { date: "2019/07/28", roomNumber: 19, userID: 46 },
      { date: "2019/07/28", roomNumber: 20, userID: 50 },
      { date: "2019/07/28", roomNumber: 22, userID: 44 },
      { date: "2019/07/28", roomNumber: 28, userID: 38 },
      { date: "2019/07/28", roomNumber: 31, userID: 55 },
      { date: "2019/07/28", roomNumber: 36, userID: 77 },
      { date: "2019/07/28", roomNumber: 37, userID: 14 },
      { date: "2019/07/28", roomNumber: 40, userID: 38 },
      { date: "2019/07/28", roomNumber: 47, userID: 27 }
    ]);
  });

  it("should show booked rooms", () => {
    expect(bookingRepo.showCurrentBookedRooms).to.be.a("function");
    expect(bookingRepo.showCurrentBookedRooms("2019/07/28")).to.eql([
      1,
      2,
      8,
      10,
      14,
      17,
      18,
      19,
      20,
      22,
      28,
      31,
      36,
      37,
      40,
      47
    ]);
  });

  it("should show booked rooms on a given day", () => {
    expect(bookingRepo.showBookedRooms).to.be.a("function");
    expect(bookingRepo.showBookedRooms("2019/07/28", data.rooms)).to.eql([
    { "bedSize": "twin", "bidet": false, "costPerNight": 275.99, "numBeds": 1, "number": 3, "roomType": "suite" },
    { "bedSize": "full", "bidet": false, "costPerNight": 177.03, "numBeds": 1, "number": 4, "roomType": "junior suite" },
    { "bedSize": "king", "bidet": false, "costPerNight": 246.65, "numBeds": 2, "number": 5, "roomType": "junior suite" },
    { "bedSize": "king", "bidet": false, "costPerNight": 211.42, "numBeds": 1, "number": 6, "roomType": "suite" },
    { "bedSize": "full", "bidet": false, "costPerNight": 376.56, "numBeds": 2, "number": 7, "roomType": "residential suite" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 327.76, "numBeds": 1, "number": 9, "roomType": "residential suite" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 216.05, "numBeds": 1, "number": 11, "roomType": "single room" },
    { "bedSize": "queen", "bidet": false, "costPerNight": 247.86, "numBeds": 1, "number": 12, "roomType": "single room" },
    { "bedSize": "full", "bidet": false, "costPerNight": 372.83, "numBeds": 1, "number": 13, "roomType": "residential suite" },
    { "bedSize": "king", "bidet": false, "costPerNight": 163.1, "numBeds": 1, "number": 15, "roomType": "suite" },
    { "bedSize": "king", "bidet": true, "costPerNight": 229.8, "numBeds": 1, "number": 16, "roomType": "single room" },
    { "bedSize": "queen", "bidet": false, "costPerNight": 480.56, "numBeds": 2, "number": 21, "roomType": "suite" },
    { "bedSize": "full", "bidet": false, "costPerNight": 245.42, "numBeds": 2, "number": 23, "roomType": "single room" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 174.95, "numBeds": 1, "number": 24, "roomType": "suite" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 307.49, "numBeds": 1, "number": 25, "roomType": "junior suite" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 391.55, "numBeds": 1, "number": 26, "roomType": "single room" },
    { "bedSize": "king", "bidet": true, "costPerNight": 286.48, "numBeds": 2, "number": 27, "roomType": "junior suite" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 351.66, "numBeds": 1, "number": 29, "roomType": "junior suite" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 372.85, "numBeds": 1, "number": 30, "roomType": "junior suite" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 366.89, "numBeds": 1, "number": 32, "roomType": "single room" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 245.52, "numBeds": 2, "number": 33,  "roomType": "suite" },
    { "bedSize": "king", "bidet": true, "costPerNight": 329.96, "numBeds": 2, "number": 34, "roomType": "single room" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 230.28, "numBeds": 2, "number": 35, "roomType": "single room" },
    { "bedSize": "twin", "bidet": false, "costPerNight": 379.66, "numBeds": 2, "number": 38, "roomType": "single room" },
    { "bedSize": "twin", "bidet": true, "costPerNight": 399.52, "numBeds": 1, "number": 39, "roomType": "suite" },
    { "bedSize": "twin", "bidet": false, "costPerNight": 405.13, "numBeds": 2, "number": 41, "roomType": "junior suite" },
    { "bedSize": "queen", "bidet": false, "costPerNight": 409.37, "numBeds": 1, "number": 42, "roomType": "single room" },
    { "bedSize": "king", "bidet": false, "costPerNight": 457.17, "numBeds": 1, "number": 43, "roomType": "junior suite", },
    { "bedSize": "queen", "bidet": false, "costPerNight": 368.33, "numBeds": 1, "number": 44, "roomType": "residential suite", },
    { "bedSize": "full", "bidet": false, "costPerNight": 301.62, "numBeds": 2, "number": 45, "roomType": "junior suite", },
    { "bedSize": "twin", "bidet": false, "costPerNight": 353.97, "numBeds": 2, "number": 46, "roomType": "junior suite" },
    { "bedSize": "queen", "bidet": true, "costPerNight": 344.92, "numBeds": 2, "number": 48,  "roomType": "suite" },
    { "bedSize": "twin", "bidet": false, "costPerNight": 271.95, "numBeds": 1, "number": 49,  "roomType": "single room" },
    { "bedSize": "queen", "bidet": false, "costPerNight": 493.38, "numBeds": 2, "number": 50, "roomType": "single room" }
  ]);
    expect(domUpdates.displayAvailableRoomsOnSpecifiedDate).to.have.been.called();
  });

  it("should give a number of available rooms for a given day", () => {
    expect(bookingRepo.totalRoomsAvailableToday).to.be.a("function");
    expect(bookingRepo.totalRoomsAvailableToday("2019/07/28")).to.equal(34);
  });

  it("should calculate the total revenue from bookings on a given date", () => {
    expect(bookingRepo.totalBookingRevenueToday).to.be.a("function");
    expect(bookingRepo.totalBookingRevenueToday("2019/07/28")).to.equal(
      4790.64
    );
  });

  it("should calculate the percentage of occupied rooms for a given day", () => {
    expect(bookingRepo.percentageOfRoomsOccupiedToday).to.be.a("function");
    expect(bookingRepo.percentageOfRoomsOccupiedToday("2019/07/28")).to.equal(
      32
    );
  });

  it("should display the output of methods to the DOM", () => {
    expect(bookingRepo.displayToDom).to.be.a("function");
    bookingRepo.displayToDom();
    expect(domUpdates.displayPercentageOfBookings).to.have.been.called();
    expect(domUpdates.displayBookingRevenueToday).to.have.been.called();
    expect(domUpdates.displayRoomsAvailableToday).to.have.been.called();
    expect(domUpdates.displayDailyBookedRooms).to.have.been.called();
  });
});
