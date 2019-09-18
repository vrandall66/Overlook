import chai from "chai";
const expect = chai.expect;
import spies from "chai-spies";
chai.use(spies);
import RoomServiceRepo from "../src/RoomServiceRepo.js";
import data from "../data/allData.js";
import domUpdates from "../src/domUpdates.js";
chai.spy.on(
  domUpdates,
  ["displayRoomServiceCharges", "displayAllRoomServiceOrders"],
  () => {}
);

let roomServiceRepo;

before(() => {
  roomServiceRepo = new RoomServiceRepo(data.roomServices);
});

describe("RoomServices", () => {
  it("should be an instance of RoomServices", () => {
    expect(RoomServiceRepo).to.be.a("function");
    expect(roomServiceRepo).to.be.an.instanceof(RoomServiceRepo);
  });

  it("should instantiate Room Service data", () => {
    expect(roomServiceRepo.createFromData).to.be.a("function");
    expect(roomServiceRepo.createFromData(data.roomServices).length).to.equal(
      100
    );
  });

  it("should find all daily rooms that ordered room service", () => {
    expect(roomServiceRepo.findAllByDate).to.be.a("function");
    expect(roomServiceRepo.findAllByDate("9/07/28")).to.eql([
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
    expect(roomServiceRepo.totalRevenueForDate).to.be.a("function");
    expect(roomServiceRepo.totalRevenueForDate("2019/07/28")).to.equal(65.35);
  });

  it("should find all items ordered on a given day", () => {
    expect(roomServiceRepo.allDailyOrderedItems).to.be.a("function");
    roomServiceRepo.allDailyOrderedItems("2019/07/28");
    expect(domUpdates.displayAllRoomServiceOrders).to.have.been.called();
  });

  it("should display information to the DOM", () => {
    expect(roomServiceRepo.displayToDom).to.be.a("function");
    roomServiceRepo.displayToDom();
    expect(domUpdates.displayRoomServiceCharges).to.have.been.called();
  });
});
