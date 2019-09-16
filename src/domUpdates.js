import $ from "jquery";

const domUpdates = {
  displayDate(today) {
    $("#today").text(today);
  },

  displayDailyBookedRooms(number) {
    $("#daily-bookings").text(number);
  },

  displayPercentageOfBookings(percentage) {
    $("#rooms-available-percentage").text(percentage);
  },

  displayBookingRevenueToday(dailyBookings) {
    $("#daily-revenue").text(dailyBookings);
  },

  displayRoomsAvailableToday(number) {
    $("#rooms-available-number").text(number);
  },

  displayRoomServiceCharges(revenue) {
    $("#room-service-charges-day").text(revenue);
  },

  displayFilteredCustomers(name) {
    $(`<p>${name.name}, ${name.id}</p>`).appendTo($('#current-customer'))
  }
};

export default domUpdates;