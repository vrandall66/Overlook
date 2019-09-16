import Guest from "./Guest.js";
import Booking from "./Booking.js";
import RoomServices from "./RoomServices.js";

class Hotel {
  constructor(guests, rooms, bookings, roomServices, date) {
    this.today = date;
    this.guests = new Guest(guests);
    this.bookings = new Booking(rooms, bookings, this.today);
    this.roomServices = new RoomServices(roomServices, this.today);
    this.currentCustomer = null;
  }
}

export default Hotel;
