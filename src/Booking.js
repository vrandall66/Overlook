import domUpdates from "./domUpdates";

class Booking {
  constructor(roomsData, bookingsData, date) {
    this.rooms = roomsData.rooms;
    this.bookings = bookingsData.bookings;
    this.date = date;
    this.displayToDom();
  }

  findBookedRooms() {
    let booked = this.bookings.filter(booking => {
      return booking.date === this.date;
    });
    return booked.sort((a, b) => {
      return a.roomNumber - b.roomNumber;
    });
  }

  totalRoomsAvailableToday() {
    let bookedRooms = this.findBookedRooms(this.date);
    let number = (this.rooms.length - bookedRooms.length);
    return number;
  }

  totalBookingRevenueToday() {
    let roomsBooked = this.findBookedRooms(this.date);
    let revenue = roomsBooked.reduce((num, bookedRoom) => {
      this.rooms.forEach(room => {
        if (room.number === bookedRoom.roomNumber) {
          return (num += room.costPerNight);
        }
      });
      return parseFloat(num.toFixed(2));
    }, 0);
    return revenue;
  }

  percentageOfRoomsOccupiedToday() {
    let roomsBooked = this.findBookedRooms(this.date);
    let percentage = (roomsBooked.length / this.rooms.length) * 100;
    return percentage;
  }

  displayToDom() {
    domUpdates.displayPercentageOfBookings(this.percentageOfRoomsOccupiedToday());
    domUpdates.displayBookingRevenueToday(this.totalBookingRevenueToday());
    domUpdates.displayRoomsAvailableToday(this.totalRoomsAvailableToday());
  }
}

export default Booking;
