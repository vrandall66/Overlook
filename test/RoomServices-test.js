import chai from "chai";
const expect = chai.expect;
import spies from "chai-spies";
chai.use(spies);
import RoomServices from "../src/RoomServices.js";
import data from "../data/allData.js";
import domUpdates from "../src/domUpdates.js";
chai.spy.on(
  domUpdates,
  ["displayRoomServiceCharges", "displayAllRoomServiceOrders"],
  () => {}
);

let roomServiced;

beforeEach(() => {
  let date = "2019/07/28";
  roomServiced = new RoomServices(data.roomServices, date);
});

describe("RoomServices", () => {
  it("should be an instance of RoomServices", () => {
    expect(RoomServices).to.be.a("function");
    expect(roomServiced).to.be.an.instanceof(RoomServices);
  });

  it("should find all daily rooms that ordered room service", () => {
    expect(roomServiced.findAllRoomService).to.be.a("function");
    expect(roomServiced.findAllRoomService("2019/07/28")).to.eql([
      {
        date: "2019/07/28",
        food: "Licensed Soft Sandwich",
        totalCost: 20.09,
        userID: 91
      },
      {
        date: "2019/07/28",
        food: "Handmade Cotton Sandwich",
        totalCost: 24.74,
        userID: 46
      },
      {
        date: "2019/07/28",
        food: "Refined Wooden Sandwich",
        totalCost: 20.52,
        userID: 53
      }
    ]);
  });

  it("should calculate the total revenue from Room Service for the day", () => {
    expect(roomServiced.totalRevenueToday).to.be.a("function");
    expect(roomServiced.totalRevenueToday("2019/07/28")).to.equal(65.35);
  });

  it("should find all items ordered on a given day", () => {
    expect(roomServiced.allDailyOrderedItems).to.be.a("function");
    expect(domUpdates.displayAllRoomServiceOrders).to.have.been.called();
  });

  it("should display information to the DOM", () => {
    expect(roomServiced.displayToDom).to.be.a("function");
    expect(domUpdates.displayRoomServiceCharges).to.have.been.called();
  });
});
