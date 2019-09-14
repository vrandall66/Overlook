class Hotel {
  constructor(guests, bookings, rooms, roomServices) {
    this.guests = guests;
    this.bookings = bookings;
    this.rooms = rooms;
    this.roomServices = roomServices;
  }

  totalRoomsAvailable(date) {
    let roomsAvailable = this.bookings.filter(room => {
      return room.date === date
    }).map()
    return roomsAvailable;
  }

  findRoomsBooked(date) {
    return this.bookings.filter((booking) => {
      return booking.date === date;
    })
  }

  findRoomsServiced(date) {
    return this.roomServices.filter((room) => {
      console.log(room.date === date);
    })
  }

}

export default Hotel;