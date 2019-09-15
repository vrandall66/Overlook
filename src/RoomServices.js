import domUpdates from "./domUpdates";

class RoomServices {
  constructor(data, date) {
    this.data = data.roomServices;
    this.date = date;
    this.displayToDom();
  }

  findAllRoomService() {
    return this.data.filter((room) => {
      return room.date === this.date;
    })
  }

  totalRevenueToday() {
    let roomsServiced = this.findAllRoomService(this.date)
    let totalRevenue = roomsServiced.reduce((num, room) => {
      num += room.totalCost
      return num
    }, 0)
    return totalRevenue;
  }

  displayToDom() {
    domUpdates.displayRoomServiceCharges(this.totalRevenueToday());
  }
}

export default RoomServices;
