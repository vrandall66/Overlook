import Guest from "./Guest.js";
import Booking from "./Booking.js";
import RoomServices from "./RoomServices.js"

class Hotel {
  constructor(guests, rooms, bookings, roomServices, date) {
    this.guests = new Guest(guests);
    this.bookings = new Booking(rooms, bookings, date);
    this.roomServices = new RoomServices(roomServices, date);
    this.today = date;
    this.currentCustomer = null;
  }

}

export default Hotel;
