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

  displayFilteredCustomers(customer) {
    $(
      `<option value="${customer.id}" id="${customer.id}-option">${customer.id} ${customer.name}</option>`
    ).appendTo($("#name-option"));
  },

  displayPreviousBookings(customer) {
    $(`<span data-id="${customer.id}">${customer.date}: ${customer.roomNumber}</span>`).appendTo($('#all-previous-bookings'))
  },

  displayPreviousRoomServices(customer) {
    $(`<span data-id="${customer.id}">${customer.date}: ${customer.food}, ${customer.totalCost}</span>`).appendTo($('#all-previous-room-service-orders'))
  }
};

export default domUpdates;
