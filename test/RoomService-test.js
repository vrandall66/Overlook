import chai from "chai";
const expect = chai.expect;
import RoomService from "../src/RoomService.js";

let data, roomService;

before(() => {
  data = {
    userID: 6,
    date: "2019/09/18",
    food: "Philly Cheese Steak",
    totalCost: 9.75
  };
  roomService = new RoomService(data);
});

describe("RoomService", () => {
  it("should be an instance of RoomService", () => {
    expect(RoomService).to.be.a("function");
    expect(roomService).to.be.an.instanceof(RoomService);
  });
});
