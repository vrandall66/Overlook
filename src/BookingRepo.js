import domUpdates from "./domUpdates";
import Booking from "./Booking.js";

class BookingRepo {
  constructor(data1, data2) {
    this.roomsData = data1.rooms;
    this.bookingData = this.createFromData(data2);
  }

  createFromData(allBookings) {
    let bookings = [];
    let bookingsData = allBookings.bookings;
    bookingsData.forEach(booking => {
      let newBooking = new Booking(booking);
      bookings.push(newBooking);
    });
    return bookingsData;
  }

  findBookedRooms(date) {
    let booked = this.bookingData.filter(booking => {
      return booking.date === date;
    });
    let sorted = booked.sort((a, b) => {
      return a.roomNumber - b.roomNumber;
    });
    return sorted;
  }

  showCurrentBookedRooms(date) {
    let found = this.findBookedRooms(date);
    return found.map(room => room.roomNumber);
  }

  showBookedRooms(date) {
    let alreadyBooked = this.findBookedRooms(date);
    let bookedRoomNumbers = alreadyBooked.map(booking => {
      return booking.roomNumber;
    });
    let availableRooms = this.roomsData.filter(room => {
      return !bookedRoomNumbers.includes(room.number);
    });
    this.filterByRoomType(availableRooms);
    availableRooms.forEach(room => {
      domUpdates.displayAvailableRoomsOnSpecifiedDate(room);
    });
    return availableRooms;
  }

  totalRoomsAvailableToday(date) {
    let bookedRooms = this.findBookedRooms(date);
    let number = this.roomsData.length - bookedRooms.length;
    return number;
  }

  totalBookingRevenueToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let revenue = roomsBooked.reduce((num, bookedRoom) => {
      this.roomsData.forEach(room => {
        if (room.number === bookedRoom.roomNumber) {
          return (num += room.costPerNight);
        }
      });
      return parseFloat(num.toFixed(2));
    }, 0);
    return revenue;
  }

  percentageOfRoomsOccupiedToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let percentage =
      ((roomsBooked.length - this.roomsData.length) / this.roomsData.length) *
      -100;
    return percentage;
  }

  evaluateBookingFrequency() {
    let totalBookingsOnEachDay = this.bookingData.reduce(
      (organizedBookings, reservation) => {
        if (!organizedBookings[reservation.date]) {
          organizedBookings[reservation.date] = 0;
        }
        organizedBookings[reservation.date]++;
        return organizedBookings;
      },
      {}
    );
    this.sortBookingFrequency(totalBookingsOnEachDay);
    return totalBookingsOnEachDay;
  }

  sortBookingFrequency(allBookingsFrequency) {
    let bookingDayNumbers = Object.values(allBookingsFrequency);
    let bookingDayDates = Object.keys(allBookingsFrequency);
    let sortedByPopularity = bookingDayNumbers.sort((a, b) => {
      return b - a;
    });
    let mostPopularDays = bookingDayDates
      .filter(day => {
        return allBookingsFrequency[day] === sortedByPopularity[0];
      })
      .forEach(day => domUpdates.displayMostPopularBookingDay(day));
    let leastPopularDays = bookingDayDates
      .filter(day => {
        return (
          allBookingsFrequency[day] ===
          sortedByPopularity[sortedByPopularity.length - 1]
        );
      })
      .forEach(day => domUpdates.displayLeastPopularBookingDay(day));
    return mostPopularDays, leastPopularDays;
  }

  filterByRoomType(availNumbers) {
    let organizedByRoom = availNumbers.reduce((roomType, room) => {
      if (!roomType[room.roomType]) {
        roomType[room.roomType] = [];
      }
      roomType[room.roomType].push(room);
      return roomType;
    }, {});
    let roomTypeVals = Object.values(organizedByRoom);
    roomTypeVals.forEach(roomType => {
      roomType.forEach(room => {
        domUpdates.appendAvailableRoomsToday(room);
      });
    });
  }

  displayToDom(date) {
    domUpdates.displayPercentageOfBookings(
      this.percentageOfRoomsOccupiedToday(date)
    );
    domUpdates.displayBookingRevenueToday(this.totalBookingRevenueToday(date));
    domUpdates.displayRoomsAvailableToday(this.totalRoomsAvailableToday(date));
    domUpdates.displayDailyBookedRooms(this.showCurrentBookedRooms(date));
  }
}

export default BookingRepo;
