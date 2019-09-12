class Hotel {
  constructor(guests, bookings, rooms, roomServices) {
    this.guests = guests;
    this.bookings = bookings;
    this.rooms = rooms;
    this.roomServices = roomServices;
  }

  getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = `${yyyy}/${mm}/${dd}`;
    return today;
  }

  totalRoomsAvailable(date) {
    let today = this.getDate();
    let roomsAvailable = this.bookings.filter(room => {
      if (room.date === today) {
        return room;
      }
    })
    return roomsAvailable;
  }

  findRoomsBooked() {

  }

  findRoomsServiced() {

  }
}

export default Hotel;