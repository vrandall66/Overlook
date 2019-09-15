import chai from "chai";
const expect = chai.expect;
import spies from "chai-spies";
chai.use(spies);
import RoomServices from "../src/RoomServices.js";
import roomServices from "../data/roomServices.js";
import domUpdates from "../src/domUpdates.js";
chai.spy.on(domUpdates, ["displayRoomServiceCharges"], () => {});

let roomServiced;

beforeEach(() => {
  let date = "2019/07/28";
  roomServiced = new RoomServices(roomServices, date);
});

describe("RoomServices", () => {
  it("should be an instance of RoomServices", () => {
    expect(RoomServices).to.be.a("function");
    expect(roomServiced).to.be.an.instanceof(RoomServices);
  });

  it("should find all daily rooms that ordered room service", () => {
    expect(roomServiced.findAllRoomService).to.be.a("function");
    expect(roomServiced.findAllRoomService("2019/07/28")).to.eql([
      "68",
      "80",
      "94"
    ]);
  });

  it("should calculate the total revenue from Room Service for the day", () => {
    expect(roomServiced.totalRevenueToday).to.be.a("function");
    expect(roomServiced.totalRevenueToday("2019/07/28")).to.equal(65.35);
  });
});
