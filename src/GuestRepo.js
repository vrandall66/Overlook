import Guest from "./Guest.js";

class GuestRepo {
  constructor(data) {
    this.data = data;
    this.guests = [];
  }

  createFromData() {
    let guests = this.data;
    guests.forEach(guest => {
      let newGuest = new Guest(guest);
      this.guests.push(newGuest);
    });
    return guests;
  }
}

export default GuestRepo;
