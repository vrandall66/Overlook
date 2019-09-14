class Booking {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
  }

  findBookedRooms(date) {
    let booked = this.bookings.filter((booking) => {
      return booking.date === date;
    })
    return booked.sort((a, b) => {
      return (a.roomNumber - b.roomNumber);
    })
  }

  totalRoomsAvailableToday(date) {
    let bookedRooms = this.findBookedRooms(date);
    return (this.rooms.length - bookedRooms.length);
  }

  totalBookingRevenueToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    return roomsBooked.reduce((num, bookedRoom) => {
      this.rooms.forEach((room) => {
        if (room.number === bookedRoom.roomNumber) {
          return num += room.costPerNight;
        }
      })
      return parseFloat(num.toFixed(2));
    }, 0)
  }

  percentageOfRoomsOccupiedToday(date) {
    let roomsBooked = this.findBookedRooms(date)
    return (roomsBooked.length / this.rooms.length) * 100
  }

}

export default Booking;