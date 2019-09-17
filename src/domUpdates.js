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
      `<span data-id="${customer.id}">Booking Date: ${customer.date} Room Number: ${customer.roomNumber}</span></ br>`
    ).appendTo($("#all-previous-bookings"));
  },

  displayPreviousRoomServices(customer) {
    $(
      `<span data-id="${customer.id}">Order Date: ${customer.date}: Item Ordered: ${customer.food}: $${customer.totalCost}</span></ br>`
    ).appendTo($("#all-previous-room-service-orders"));
  },

  displayAllRoomServiceOrders(order) {
    $(
      `<span id="all-room-service-orders" data-id="${order.userId}">Order Date: ${order.date}: Guest ID: ${order.userID} Item Ordered: ${order.food}: $${order.totalCost}</span></ br>`
    ).appendTo($("#daily-room-service-orders"));
  },

  displayMoneySpentOnRoomService(amount) {
    $(`<p class="orders-tab-p">$${amount}</p>`).appendTo(
      $("#total-spent-on-service")
    );
  },

  displayMoneySpentOnGivenDay(money) {
    $(`<p class="orders-tab-p">$${money}</p>`).appendTo(
      $("#total-spent-today-on-service")
    );
  },

  changeName(user) {
    $("#current-customer").text(user.name);
    $("#room-service-orders-header").text(`Orders for ${user.name}`);
    $("#bookings-header").text(`Bookings for ${user.name}`);
    $("#customer-dropdown-form").remove();
    $('#no-user').remove();
    $('#all-room-service-orders').remove();
  },

  noUserFound() {
    $(`<p id="no-user">There is not a user under that name</p>`).appendTo($('#top-of-find-user-form'))
  }
};

export default domUpdates;
