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
    "displayLeastPopularBookingDay",
    "appendAvailableRoomsToday"
  ],
  () => {}
);

let bookingRepo;

beforeEach(() => {
  bookingRepo = new BookingRepo(data.rooms, data.bookings);
});

describe("Booking", () => {
  it("should be an instance of Booking", () => {
    expect(BookingRepo).to.be.a("function");
    expect(bookingRepo).to.be.an.instanceof(BookingRepo);
  });

  it("should instantiate all Booking data", () => {
    expect(bookingRepo.createFromData).to.be.a("function");
    expect(bookingRepo.createFromData(data.bookings).length).to.equal(
      2001
    );
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
      {
        bedSize: "twin",
        bidet: false,
        costPerNight: 275.99,
        numBeds: 1,
        number: 3,
        roomType: "suite"
      },
      {
        bedSize: "full",
        bidet: false,
        costPerNight: 177.03,
        numBeds: 1,
        number: 4,
        roomType: "junior suite"
      },
      {
        bedSize: "king",
        bidet: false,
        costPerNight: 246.65,
        numBeds: 2,
        number: 5,
        roomType: "junior suite"
      },
      {
        bedSize: "king",
        bidet: false,
        costPerNight: 211.42,
        numBeds: 1,
        number: 6,
        roomType: "suite"
      },
      {
        bedSize: "full",
        bidet: false,
        costPerNight: 376.56,
        numBeds: 2,
        number: 7,
        roomType: "residential suite"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 327.76,
        numBeds: 1,
        number: 9,
        roomType: "residential suite"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 216.05,
        numBeds: 1,
        number: 11,
        roomType: "single room"
      },
      {
        bedSize: "queen",
        bidet: false,
        costPerNight: 247.86,
        numBeds: 1,
        number: 12,
        roomType: "single room"
      },
      {
        bedSize: "full",
        bidet: false,
        costPerNight: 372.83,
        numBeds: 1,
        number: 13,
        roomType: "residential suite"
      },
      {
        bedSize: "king",
        bidet: false,
        costPerNight: 163.1,
        numBeds: 1,
        number: 15,
        roomType: "suite"
      },
      {
        bedSize: "king",
        bidet: true,
        costPerNight: 229.8,
        numBeds: 1,
        number: 16,
        roomType: "single room"
      },
      {
        bedSize: "queen",
        bidet: false,
        costPerNight: 480.56,
        numBeds: 2,
        number: 21,
        roomType: "suite"
      },
      {
        bedSize: "full",
        bidet: false,
        costPerNight: 245.42,
        numBeds: 2,
        number: 23,
        roomType: "single room"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 174.95,
        numBeds: 1,
        number: 24,
        roomType: "suite"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 307.49,
        numBeds: 1,
        number: 25,
        roomType: "junior suite"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 391.55,
        numBeds: 1,
        number: 26,
        roomType: "single room"
      },
      {
        bedSize: "king",
        bidet: true,
        costPerNight: 286.48,
        numBeds: 2,
        number: 27,
        roomType: "junior suite"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 351.66,
        numBeds: 1,
        number: 29,
        roomType: "junior suite"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 372.85,
        numBeds: 1,
        number: 30,
        roomType: "junior suite"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 366.89,
        numBeds: 1,
        number: 32,
        roomType: "single room"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 245.52,
        numBeds: 2,
        number: 33,
        roomType: "suite"
      },
      {
        bedSize: "king",
        bidet: true,
        costPerNight: 329.96,
        numBeds: 2,
        number: 34,
        roomType: "single room"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 230.28,
        numBeds: 2,
        number: 35,
        roomType: "single room"
      },
      {
        bedSize: "twin",
        bidet: false,
        costPerNight: 379.66,
        numBeds: 2,
        number: 38,
        roomType: "single room"
      },
      {
        bedSize: "twin",
        bidet: true,
        costPerNight: 399.52,
        numBeds: 1,
        number: 39,
        roomType: "suite"
      },
      {
        bedSize: "twin",
        bidet: false,
        costPerNight: 405.13,
        numBeds: 2,
        number: 41,
        roomType: "junior suite"
      },
      {
        bedSize: "queen",
        bidet: false,
        costPerNight: 409.37,
        numBeds: 1,
        number: 42,
        roomType: "single room"
      },
      {
        bedSize: "king",
        bidet: false,
        costPerNight: 457.17,
        numBeds: 1,
        number: 43,
        roomType: "junior suite"
      },
      {
        bedSize: "queen",
        bidet: false,
        costPerNight: 368.33,
        numBeds: 1,
        number: 44,
        roomType: "residential suite"
      },
      {
        bedSize: "full",
        bidet: false,
        costPerNight: 301.62,
        numBeds: 2,
        number: 45,
        roomType: "junior suite"
      },
      {
        bedSize: "twin",
        bidet: false,
        costPerNight: 353.97,
        numBeds: 2,
        number: 46,
        roomType: "junior suite"
      },
      {
        bedSize: "queen",
        bidet: true,
        costPerNight: 344.92,
        numBeds: 2,
        number: 48,
        roomType: "suite"
      },
      {
        bedSize: "twin",
        bidet: false,
        costPerNight: 271.95,
        numBeds: 1,
        number: 49,
        roomType: "single room"
      },
      {
        bedSize: "queen",
        bidet: false,
        costPerNight: 493.38,
        numBeds: 2,
        number: 50,
        roomType: "single room"
      }
    ]);
    expect(domUpdates.appendAvailableRoomsToday).to.have.been.called();
    expect(
      domUpdates.displayAvailableRoomsOnSpecifiedDate
    ).to.have.been.called();
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
      68
    );
  });

  it("should find the most popular and least popular booking dates", () => {
    expect(bookingRepo.evaluateBookingFrequency).to.be.a("function");
    expect(bookingRepo.evaluateBookingFrequency()).to.eql({
      "2019/10/19": 12,
      "2019/10/30": 18,
      "2019/09/01": 18,
      "2019/08/28": 22,
      "2019/08/16": 23,
      "2019/09/05": 15,
      "2019/10/29": 21,
      "2019/08/27": 24,
      "2019/09/26": 26,
      "2019/09/27": 20,
      "2019/09/29": 19,
      "2019/08/29": 17,
      "2019/09/06": 20,
      "2019/08/30": 20,
      "2019/07/26": 19,
      "2019/08/08": 16,
      "2019/10/18": 19,
      "2019/09/04": 21,
      "2019/10/07": 19,
      "2019/08/12": 21,
      "2019/08/02": 23,
      "2019/07/27": 19,
      "2019/09/30": 19,
      "2019/07/30": 19,
      "2019/10/17": 20,
      "2019/10/11": 25,
      "2019/08/01": 19,
      "2019/08/09": 22,
      "2019/08/17": 16,
      "2019/08/05": 17,
      "2019/10/10": 16,
      "2019/08/11": 21,
      "2019/10/22": 26,
      "2019/10/31": 12,
      "2019/07/25": 20,
      "2019/08/20": 12,
      "2019/09/13": 17,
      "2019/09/24": 23,
      "2019/10/28": 27,
      "2019/09/19": 18,
      "2019/10/13": 20,
      "2019/10/25": 19,
      "2019/09/14": 20,
      "2019/09/25": 20,
      "2019/08/19": 15,
      "2019/09/03": 17,
      "2019/08/24": 22,
      "2019/10/09": 19,
      "2019/09/11": 21,
      "2019/10/08": 17,
      "2019/10/14": 16,
      "2019/07/31": 26,
      "2019/09/08": 18,
      "2019/09/07": 27,
      "2019/09/21": 13,
      "2019/08/23": 25,
      "2019/08/31": 22,
      "2019/07/23": 10,
      "2019/09/09": 17,
      "2019/07/29": 18,
      "2019/09/20": 22,
      "2019/09/15": 23,
      "2019/08/04": 20,
      "2019/10/02": 19,
      "2019/08/06": 25,
      "2019/07/24": 18,
      "2019/09/22": 24,
      "2019/08/21": 18,
      "2019/09/23": 22,
      "2019/10/24": 22,
      "2019/10/06": 23,
      "2019/09/17": 17,
      "2019/08/18": 22,
      "2019/09/16": 26,
      "2019/08/03": 23,
      "2019/08/14": 18,
      "2019/10/20": 20,
      "2019/10/16": 21,
      "2019/10/26": 23,
      "2019/09/02": 20,
      "2019/08/13": 19,
      "2019/08/07": 16,
      "2019/10/05": 21,
      "2019/10/27": 20,
      "2019/10/12": 17,
      "2019/08/22": 18,
      "2019/08/25": 18,
      "2019/09/18": 18,
      "2019/10/04": 21,
      "2019/09/10": 21,
      "2019/07/28": 16,
      "2019/10/03": 16,
      "2019/09/12": 20,
      "2019/10/01": 18,
      "2019/10/21": 24,
      "2019/09/28": 23,
      "2019/10/15": 20,
      "2019/08/26": 21,
      "2019/10/23": 27,
      "2019/08/15": 16,
      "2019/08/10": 22
    });
  });

  it("should sort booking dates by popularity", () => {
    expect(bookingRepo.sortBookingFrequency).to.be.a("function");
    expect(domUpdates.displayMostPopularBookingDay).to.have.been.called();
    expect(domUpdates.displayLeastPopularBookingDay).to.have.been.called();
  });

  it("should filter available rooms by room type", () => {
    expect(bookingRepo.filterByRoomType).to.be.a("function");
    expect(domUpdates.appendAvailableRoomsToday).to.have.been.called();
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
