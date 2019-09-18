import Guest from "./Guest.js";

class GuestRepo {
  constructor(data) {
    this.data = data;
  }

  createFromData() {
    let guests = this.data;
    guests.forEach(guest => {
      let newGuest = new Guest(guest);
      this.data.push(newGuest);
    });
    return guests;
  }
}

export default GuestRepo;
