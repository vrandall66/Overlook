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
    $(
      `<span data-id="${customer.id}">Booking Date: ${customer.date} Room Number: ${customer.roomNumber}</span>`
    ).appendTo($("#all-previous-bookings"));
  },

  displayPreviousRoomServices(customer) {
    $(
      `<span data-id="${customer.id}">Order Date: ${customer.date}: Item Ordered: ${customer.food}: ${customer.totalCost}</span>`
    ).appendTo($("#all-previous-room-service-orders"));
  },

  displayAllRoomServiceOrders(order) {
    $(
      `<span data-id="${order.userId}">Order Date: ${order.date}: Guest: ${order.userID} Item Ordered: ${order.food}: ${order.totalCost}</span>`
    ).appendTo($("#daily-room-service-orders"));
  },

  displayMoneySpentOnRoomService(amount) {
    $(`<p class="orders-tab-p">${amount}</p>`).appendTo($('#total-spent-on-service'));
  }
};

export default domUpdates;
