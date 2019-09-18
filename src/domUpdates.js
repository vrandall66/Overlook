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
    previousBookingDiv.addClass("container");
    previousBookingDiv.addClass("bookings-container");
    previousBookingDiv.removeClass("hidden");
    $(
      `<span data-id="${customer.id}"><b>Booking Date:</b> ${customer.date} <b>Room Number:</b> ${customer.roomNumber}</span></ br>`
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
    $("#all-previous-bookings").removeClass("hidden");
    $("#available-bookings").addClass("container");
    $(`<tr class="book-room" data-room-number=${room.number}>
      <td>
        ${room.number}
      </td>
      <td>
        ${room.roomType}
      </td>
      <td>
        ${room.bidet}
      </td>
      <td>
        ${room.bedSize}
      </td>
      <td>
        ${room.numBeds}
      </td>
      <td>
        $${room.costPerNight}
      </td>
      <td>
      <button data-id=${room.number} type="button">Book Room</button>
      </td>
    </tr>`).appendTo($("#available-rooms-date-table"));
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
  //   // if (data[0] == RoomService)
  //   console.log("data[0]", data[0]);
  },

  displayValidCustomerButtons() {
    $(`
    <button id="calculate-total-bill" type="button">Calculate Total Bill</button>
    `).appendTo($("#find-customers"));
    $(`<form class="bookings-form">
    <button id="create-new-booking" type="button"> New Booking</button>
    <button id="customer-upgrade-room" type="button">Upgrade Room</button>
    </form>`).appendTo($("#bookings-tab-form"));
    $(
      `<button id="create-new-order" type="button">Order Room Service</button>`
    ).appendTo($("#orders-tab-form"));
  },

  generateBookingForm() {
    $(`<form id="new-booking-form" class="bookings-form">
    <input type="text" placeholder=""`);
  },

  appendBookingsTable() {
    $("#available-bookings").removeClass("hidden");
    $("#available-rooms-date").removeClass("hidden");
    $("#available-rooms-date-container").removeClass("hidden");
    $("#available-rooms-date-table").removeClass("hidden");
    $(".available-bookings-table").removeClass("hidden");
  },

  appendAvailableRoomsToday(room) {
    $('.main-available-rooms').removeClass('hidden');
    $('#main-tab-available-rooms').removeClass('hidden');
    $('#main-available-rooms-container').removeClass('hidden');
    $(`<tr class="book-room" data-room-number=${room.number}>
      <td>
        ${room.number}
      </td>
      <td>
        ${room.roomType}
      </td>
      <td>
        ${room.bidet}
      </td>
      <td>
        ${room.bedSize}
      </td>
      <td>
        ${room.numBeds}
      </td>
      <td>
        $${room.costPerNight}
      </td>
      <td>
      <button data-id=${room.number} type="button">Book Room</button>
      </td>
    </tr>`).appendTo($("#main-tab-available-rooms"));
  }
};

export default domUpdates;
