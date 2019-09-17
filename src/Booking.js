import domUpdates from "./domUpdates";
import allData from "../data/allData";

class Booking {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.roomNumber = data.roomNumber;
  }

  static createFromData(bookings) {
    let bookingsData = bookings.bookings;
    bookingsData.forEach(booking => {
      let newBooking = new Booking(booking);
      window.bookings.push(newBooking);
    });
    return bookingsData;
  }

  static findBookedRooms(date) {
    let booked = window.bookings.filter(booking => {
      return booking.date === date;
    });
    let sorted = booked.sort((a, b) => {
      return a.roomNumber - b.roomNumber;
    });
    return sorted;
  }

  static showCurrentBookedRooms(date) {
    let found = this.findBookedRooms(date);
    return found.map(room => room.roomNumber);
  }

  static showBookedRooms(date, roomsData) {
    let alreadyBooked = this.findBookedRooms(date);
    let bookedRoomNumbers = alreadyBooked.map(booking => {
      return booking.roomNumber;
    });
    let availableRooms = roomsData.rooms.filter(room => {
      return !bookedRoomNumbers.includes(room.number);
    });
    availableRooms.forEach(room => {
      domUpdates.displayAvailableRoomsOnSpecifiedDate(room);
    });
    return availableRooms;
  }

  static totalRoomsAvailableToday(date) {
    let bookedRooms = this.findBookedRooms(date);
    let number = allData.rooms.rooms.length - bookedRooms.length;
    return number;
  }

  static totalBookingRevenueToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let revenue = roomsBooked.reduce((num, bookedRoom) => {
      allData.rooms.rooms.forEach(room => {
        if (room.number === bookedRoom.roomNumber) {
          return (num += room.costPerNight);
        }
      });
      return parseFloat(num.toFixed(2));
    }, 0);
    return revenue;
  }

  static percentageOfRoomsOccupiedToday(date) {
    let roomsBooked = this.findBookedRooms(date);
    let percentage = (roomsBooked.length / allData.rooms.rooms.length) * 100;
    return percentage;
  }

  static evaluateBookingFrequency() {
    let totalBookingsOnEachDay = window.bookings.reduce(
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

  static sortBookingFrequency(allBookingsFrequency) {
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

  static displayToDom(date) {
    domUpdates.displayPercentageOfBookings(
      this.percentageOfRoomsOccupiedToday(date)
    );
    domUpdates.displayBookingRevenueToday(this.totalBookingRevenueToday(date));
    domUpdates.displayRoomsAvailableToday(this.totalRoomsAvailableToday(date));
    domUpdates.displayDailyBookedRooms(this.showCurrentBookedRooms(date));
  }
}

export default Booking;
