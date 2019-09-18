import domUpdates from "./domUpdates";
import RoomService from "./RoomService.js";

class RoomServiceRepo {
  constructor(data) {
    this.data = this.createFromData(data);
  }

  createFromData(roomServices) {
    let orders = [];
    roomServices.roomServices.forEach(log => {
      let newOrder = new RoomService(log);
      orders.push(newOrder);
    });
    return orders;
  }

  findAllByDate(date) {
    let found = this.data.filter(service => {
      return service.date.includes(date);
    });
    return found;
  }

  totalRevenueForDate(date) {
    let roomsServiced = this.findAllByDate(date);
    let totalRevenue = roomsServiced.reduce((amount, room) => {
      amount += room.totalCost;
      return amount;
    }, 0);
    return totalRevenue;
  }

  allDailyOrderedItems(date) {
    let allOrders = this.findAllByDate(date);
    allOrders.map(order => {
      domUpdates.displayAllRoomServiceOrders(order);
    });
    return allOrders;
  }

  displayToDom(date) {
    domUpdates.displayRoomServiceCharges(this.totalRevenueForDate(date));
  }
}

export default RoomServiceRepo;
