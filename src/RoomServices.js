import domUpdates from "./domUpdates";

class RoomServices {
  constructor(data, date) {
    this.data = data;
    this.date = date;
    this.displayToDom(date);
    this.allDailyOrderedItems(date);
  }

  sortRoomServices() {
    let sorted = Object.keys(this.data).sort((a, b) => {
      return a.this.data.date - b.this.data.date;
    })
    return sorted;
  }

  findAllRoomService(date) {
    let found = this.data.roomServices.filter((service) => {
      return service.date.includes(date);
    })
    return found;
  }

  totalRevenueToday(date) {
    let roomsServiced = this.findAllRoomService(date);
    let totalRevenue = roomsServiced.reduce((amount, room) => {
      amount += room.totalCost;
      return amount;
    }, 0)
    return totalRevenue;
  }

  allDailyOrderedItems(date) {
    let allOrders = this.findAllRoomService(date);
    let orderedItems = allOrders.map(order => {
      console.log('order', order)
    })
    return orderedItems;
  }

  displayToDom() {
    domUpdates.displayRoomServiceCharges(this.totalRevenueToday(this.date));
  }
}

export default RoomServices;
