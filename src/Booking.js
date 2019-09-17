import domUpdates from "./domUpdates";
import allData from "../data/allData";

class Booking {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.roomNumber = data.roomNumber;
  }

  static createFromData(bookings) {
    let bookingsData = bookings.bookings;
    bookingsData.forEach(booking => {
      let newBooking = new Booking(booking);
      window.bookings.push(newBooking);
    });
    return bookingsData;
  }

  static findBookedRooms(date) {
    let booked = window.bookings.filter(booking => {
      return booking.date === date;
    });
    let sorted = booked.sort((a, b) => {
      return a.roomNumber - b.roomNumber;
    });
    return sorted;
  }

  static showBookedRooms(date) {
    let found = this.findBookedRooms(date);
    console.log(found.map(room => room.roomNumber));
    return found.map(room => room.roomNumber);
  }

  static totalRoomsAvailableToday(date) {
    let bookedRooms = this.findBookedRooms(date);
    let number = allData.rooms.rooms.length - bookedRooms.length;
    return number;
  }

  static totalBookingRevenueToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let revenue = roomsBooked.reduce((num, bookedRoom) => {
      allData.rooms.rooms.forEach(room => {
        if (room.number === bookedRoom.roomNumber) {
          return (num += room.costPerNight);
        }
      });
      return parseFloat(num.toFixed(2));
    }, 0);
    return revenue;
  }

  static percentageOfRoomsOccupiedToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let percentage = (roomsBooked.length / allData.rooms.rooms.length) * 100;
    return percentage;
  }

  static displayToDom(date) {
    domUpdates.displayPercentageOfBookings(
      this.percentageOfRoomsOccupiedToday(date)
    );
    domUpdates.displayBookingRevenueToday(this.totalBookingRevenueToday(date));
    domUpdates.displayRoomsAvailableToday(this.totalRoomsAvailableToday(date));
    domUpdates.displayDailyBookedRooms(this.showBookedRooms(date));
  }
}

export default Booking;
