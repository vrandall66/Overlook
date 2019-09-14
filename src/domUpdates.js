import $ from "jquery";

const domUpdates = {
  displayDate(today) {
    $("#today").text(today);
  },

  displayDailyBookedRooms(number) {
    let dailyBookings = $("#daily-bookings");
    $(`<h5>${number}</h5>`).appendTo(dailyBookings);
  },

  displayPercentageOfBookings(percentage) {
    $('#rooms-available-percentage').text(percentage);
  },

  displayBookingRevenueToday(dailyBookings) {
    $('#daily-revenue').text(dailyBookings)
  },

  displayRoomsAvailableToday(number) {
    $('#rooms-available-number').text(number);
  }
};

export default domUpdates;
