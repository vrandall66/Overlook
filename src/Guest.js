import domUpdates from "./domUpdates";

class Guest {
  constructor(data, name) {
    this.data = data;
    this.name = name;
  }

  findUser(name) {
    let guestIndex = Object.keys(this.data).find(user => {
      return this.data[user].name === name;
    });
    return parseInt(guestIndex) + 1;
  }
}

export default Guest;
