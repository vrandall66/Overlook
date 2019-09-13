class Hotel {
  constructor(guests, bookings, rooms, roomServices) {
    this.guests = guests;
    this.bookings = bookings;
    this.rooms = rooms;
    this.roomServices = roomServices;
  }

  totalRoomsAvailable(date) {
    let roomsAvailable = this.bookings.filter(room => {
      if (room.date === date) {
        return room;
      }
    })
    return roomsAvailable;
  }

  findRoomsBooked(date) {
    return this.bookings.filter((booking) => {
      return booking.date === date;
    })
  }

  findRoomsServiced(date) {
    return this.roomServices.filter((room) => {
      return room.date === date;
    })
  }

}

export default Hotel;