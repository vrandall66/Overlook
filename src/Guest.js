class Guest {
  constructor(guest) {
    this.id = guest.id;
    this.name = guest.name;
  }

  static createFromData(customers) {
    let guests = customers.users;
    guests.forEach(guest => {
      let newGuest = new Guest(guest);
      window.customers.push(newGuest);
    });
    return guests;
  }
}

export default Guest;
