class RoomService {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.food = data.food;
    this.totalCost = data.totalCost;
  }
}

export default RoomService;