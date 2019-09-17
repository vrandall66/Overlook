import domUpdates from "./domUpdates";

class RoomServices {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.food = data.food;
    this.totalCost = data.totalCost;
  }

  static createFromData(roomServices) {
    let orders = roomServices.roomServices;
    orders.forEach(log => {
      let newOrder = new RoomServices(log);
      window.orders.push(newOrder);
    });
    return orders;
  }

  static findAllByDate(date) {
    let found = window.orders.filter(service => {
      return service.date.includes(date);
    });
    console.log(found);
    return found;
  }

  static totalRevenueToday(date) {
    let roomsServiced = this.findAllByDate(date);
    let totalRevenue = roomsServiced.reduce((amount, room) => {
      amount += room.totalCost;
      return amount;
    }, 0);
    return totalRevenue;
  }

  static allDailyOrderedItems(date) {
    let allOrders = this.findAllByDate(date);
    allOrders.map(order => {
      domUpdates.displayAllRoomServiceOrders(order);
    });
    return allOrders;
  }

  static displayToDom(date) {
    domUpdates.displayRoomServiceCharges(this.totalRevenueToday(date));
  }
}

export default RoomServices;
