import domUpdates from "./domUpdates";

class Guest {
  constructor(data, name) {
    this.data = data;
    console.log(this.data);
    this.name = name;
  }

  findUser(name) {
    let guestIndex = Object.keys(this.data).find(user => {
      return this.data[user].name === name;
    });
    let guestId = parseInt(guestIndex) + 1;
    return guestId;
  }

  createNewGuest() {}
}

export default Guest;
