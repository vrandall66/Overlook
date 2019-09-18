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
    let previousBookingDiv = $("#all-previous-bookings");
    previousBookingDiv.addClass("container, bookings-container");
    previousBookingDiv.removeClass("hidden");
    $(".hidden").removeClass("hidden");
    $(
      `<span data-id="${customer.id}">Booking Date: ${customer.date} Room Number: ${customer.roomNumber}</span></ br>`
    ).appendTo(previousBookingDiv);
  },

  displayPreviousRoomServices(customer) {
    $("#daily-room-service-orders").removeClass("container");
    $("#all-previous-room-service-orders").addClass("container");
    $("#all-previous-room-service-orders").removeClass("hidden");
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
    $(`<div id="total-spent-on-service" class="container">
      <h4>Total Spent:</h4>
  <p class="orders-tab-p">$${amount}</p></div>`).appendTo($("orders-tab"));
  },

  displayMoneySpentOnGivenDay(money) {
    $(`<div id="total-spent-today-on-service" class="container">
      <h4>Total Spent Today:</h4>
      <p class="orders-tab-p">$${money}</p>
      </div>`).appendTo($("orders-tab"));
  },

  changeName(user) {
    $("#current-customer").text(user.name);
    $("#room-service-orders-header").text(`Orders for ${user.name}`);
    $("#bookings-header").text(`Bookings for ${user.name}`);
    $("#customer-dropdown-form").remove();
    $("#no-user").remove();
    $("#all-room-service-orders").remove();
    $("#least-booking-dates").remove();
    $("#most-booking-dates").remove();
  },

  noUserFound() {
    $(`<p id="no-user">There is not a user under that name</p>`).appendTo(
      $("#top-of-find-user-form")
    );
  },

  displayAvailableRoomsOnSpecifiedDate(room) {
    $("#all-previous-bookings").addClass("container");
    $("#all-previous-bookings").removeClass("hidden");
    $(
      `<span id="all-available-rooms-day" data-id="${room.number}">Room Number: ${room.number}: Room Type: ${room.roomType} Bed Size: ${room.bedSize}</span></ br>`
    ).appendTo($("#all-previous-bookings"));
  },

  displayMostPopularBookingDay(day) {
    $(
      `<span class="popular-bookings" id="most-popular-bookings"> |  ${day}  | </span></ br>`
    ).appendTo($("#most-booking-dates"));
  },

  displayLeastPopularBookingDay(day) {
    $(
      `<span class="popular-bookings" id="least-popular-bookings"> |  ${day}  |</span></ br>`
    ).appendTo("#least-booking-dates");
  },

  displayErrorsForNoCustomerData(data, name) {
    // if (data[0] == RoomService)
    console.log("data[0]", data[0]);
  },

  displayValidCustomerButtons() {
    $(`<div id="customer-upgrades-form">
    <button id="create-new-booking" type="button">New Booking</button>
    <button id="create-new-order" type="button">Order Room Service</button>
    <button id="customer-upgrade-room" type="button">Upgrade Room</button>
    <button id="calculate-total-bill" type="button">Calculate Total Bill</button>
    </div>`).appendTo($("#find-customers"));
  }
};

export default domUpdates;
