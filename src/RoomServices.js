import domUpdates from "./domUpdates";

class RoomServices {
  constructor(data, date) {
    this.data = data;
    this.date = date;
    this.displayToDom();
  }

  sortRoomServices() {
    let sorted = Object.keys(this.data).sort((a, b) => {
      return a.this.data.date - b.this.data.date;
    })
    return sorted;
  }

  findAllRoomService(date) {
    let found = Object.keys(this.data).filter((day) => {
      return this.data[day].date === date;
    })
    return found;
  }

  totalRevenueToday(date) {
    let roomsServiced = this.findAllRoomService(date);
    let totalRevenue = roomsServiced.reduce((amount, room) => {
      amount += this.data[room].totalCost;
      return amount;
    }, 0)
    return totalRevenue;
  }

  displayToDom() {
    domUpdates.displayRoomServiceCharges(this.totalRevenueToday());
  }
}

export default RoomServices;
