import $ from "jquery";
import domUpdates from "./domUpdates";
import Hotel from "./Hotel.js";
import Guest from "./Guest.js";
import RoomServices from "./RoomServices.js";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/base.scss";

$(".tabs-nav a").on("click", function(event) {
  event.preventDefault();
  $(".tabs-nav li").removeClass("current");
  $(this)
    .parent()
    .addClass("current");
  $(".all-tabs section").hide();
  $($(this).attr("href")).show();
});

let hotel;

let usersData = fetch(
  "https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users"
).then(response => response.json());
let roomsData = fetch(
  "https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms"
).then(response => response.json());
let bookingsData = fetch(
  "https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings"
).then(response => response.json());
let roomServicesData = fetch(
  "https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices"
).then(response => response.json());

let allData = { customers: {}, rooms: {}, bookings: {}, roomServices: {} };
let allCustomers = [];

Promise.all([usersData, roomsData, bookingsData, roomServicesData])
  .then(values => {
    allData.customers = values[0];
    allData.rooms = values[1];
    allData.bookings = values[2];
    allData.roomServices = values[3];
    return allData;
  })
  .then(
    allData =>
      new Hotel(
        allData.customers,
        allData.rooms,
        allData.bookings,
        allData.roomServices,
        getDate()
      )
  )
  .then(instantiateCustomers());

function instantiateCustomers() {
  setTimeout(() => {
    let guests = allData.customers.users;
    guests.forEach(guest => {
      let newGuest = new Guest(guest);
      allCustomers.push(newGuest);
    });
    return allCustomers;
  }, 2000);
}

$("#customer-search-btn").on("click", searchForCustomer);
$("#customer-add-btn").on("click", createGuest);
$("#select-customer-button").on("click", filterForCustomerData);
$("#orders-calendar-btn").on("click", updateOrdersToDate);
$("#bookings-calendar-btn").on("click", updateBookingsToDate);

function displayMain() {
  $(".all-tabs section").hide();
  $(".all-tabs section:first").show();
  $(".tabs-nav li:first").addClass("current");
}

function onPageLoad() {
  displayMain();
  getDate();
}

onPageLoad();

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = `${yyyy}/${mm}/${dd}`;
  let todayDom = `${mm}/${dd}/${yyyy}`;
  domUpdates.displayDate(todayDom);
  return today;
}

function searchForCustomer() {
  let nameInput = $("#customer-search-input")
    .val()
    .toUpperCase();
  if (nameInput === "") {
    return;
  } else {
    findUserFromInput(nameInput);
  }
}

function findUserFromInput(nameInput) {
  let filtered = allCustomers.filter(person => {
    let name = Object.values(person)[1].toUpperCase();
    return name.includes(nameInput);
  });
  if (filtered.length === 0) {
    domUpdates.noUserFound();
  }
  filtered.forEach(guest => domUpdates.displayFilteredCustomers(guest));
}

function findUserFromSelect(selected) {
  return allCustomers.find(person => {
    return person.id === parseInt(selected);
  });
}

function createGuest(e) {
  e.preventDefault(e);
  let nameInput = $("#customer-search-input").val();
  let newGuestId = allCustomers.length + 1;
  let newGuestObject = {
    id: newGuestId,
    name: nameInput
  };
  let newGuest = new Guest(newGuestObject);
  allCustomers.push(newGuest);
  Hotel.currentCustomer = newGuest;
  domUpdates.changeName(newGuest);
}

function filterForCustomerData() {
  let selected = $("#name-option").val();
  let user = findUserFromSelect(selected);
  let bookings = allData.bookings.bookings;
  let roomService = allData.roomServices.roomServices;
  let userBookings = findCustomerData(selected, bookings);
  let userRoomServices = findCustomerData(selected, roomService);
  Hotel.currentCustomer = user;
  appendUserBookingsData(userBookings);
  appendUserRoomServiceData(userRoomServices);
  totalMoneySpentOnRoomService(user);
  moneySpentOnRoomService(getDate(), user);
  domUpdates.changeName(user);
}

function findCustomerData(selected, data) {
  let filtered = data.filter(log => {
    return log.userID === parseInt(selected);
  });
  return filtered;
}

function appendUserBookingsData(filteredData) {
  filteredData.forEach(log => {
    domUpdates.displayPreviousBookings(log);
  });
}

function appendUserRoomServiceData(filteredData) {
  filteredData.forEach(log => {
    domUpdates.displayPreviousRoomServices(log);
  });
}

function totalMoneySpentOnRoomService(user) {
  let allOrders = allData.roomServices.roomServices.filter(order => {
    return order.userID === user.id;
  });
  let totalMoney = allOrders.reduce((money, currentOrder) => {
    money += currentOrder.totalCost;
    return money;
  }, 0);
  domUpdates.displayMoneySpentOnRoomService(totalMoney.toFixed(2));
  return totalMoney.toFixed(2);
}

function moneySpentOnRoomService(date, user) {
  let ordersToday = allData.roomServices.roomServices.filter(order => {
    return order.date.includes(date);
  });
  let userOrdersToday = ordersToday.filter(eachOrder => {
    return eachOrder.userID === user.id;
  });
  let userTotalSpentFood = userOrdersToday.reduce((money, currentOrder) => {
    money += currentOrder.totalCost;
    return money.toFixed(2);
  }, 0);
  domUpdates.displayMoneySpentOnGivenDay(userTotalSpentFood);
  return userTotalSpentFood;
}

function updateOrdersToDate() {
  let date = $("#orders-calendar")
    .val()
    .split("-")
    .join("/");
  console.log(hotel.roomServices.findAllRoomService(date));
}

function updateBookingsToDate() {
  let date = $("#bookings-calendar")
    .val()
    .split("-")
    .join("/");
  console.log(date);
}
