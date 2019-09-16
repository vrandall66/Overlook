import domUpdates from "./domUpdates";

class Guest {
  constructor(guest) {
    this.id = guest.id;
    this.name = guest.name;
  }

  findUser(name) {
    let guestIndex = Object.keys(this.data).find(user => {
      return this.data[user].name === name;
    });
    return parseInt(guestIndex) + 1;
  }

}

export default Guest;
