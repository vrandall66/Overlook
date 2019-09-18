import $ from "jquery";
import domUpdates from "./domUpdates";
import Guest from "./Guest.js";
import RoomServiceRepo from "./RoomServiceRepo.js";
import BookingRepo from "./BookingRepo.js";
import Booking from "./Booking.js"
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

let bookingRepo, roomServiceRepo;
window.currentGuest;
window.customers = [];

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

Promise.all([usersData, roomsData, bookingsData, roomServicesData]).then(
  values => {
    Guest.createFromData(values[0]);
    allData.rooms = values[1];
    bookingRepo = new BookingRepo(values[2]);
    roomServiceRepo = new RoomServiceRepo(values[3]);
    return allData;
  }
);

$("#customer-search-btn").on("click", searchForCustomer);
$("#customer-add-btn").on("click", createGuest);
$("#select-customer-button").on("click", filterForCustomerData);
$("#orders-calendar-btn").on("click", updateOrdersToDate);
$("#bookings-calendar-btn").on("click", updateBookingsToDate);
$("#create-new-booking").on("click", domUpdates.generateBookingForm);

function displayMain() {
  $(".all-tabs section").hide();
  $(".all-tabs section:first").show();
  $(".tabs-nav li:first").addClass("current");
}

function onPageLoad() {
  setTimeout(() => {
    displayMain();
    getDate();
    roomServiceRepo.displayToDom(getDate());
    roomServiceRepo.allDailyOrderedItems(getDate());
    bookingRepo.displayToDom(getDate());
    bookingRepo.evaluateBookingFrequency();
  }, 1000);
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
  let filtered = window.customers.filter(person => {
    let name = Object.values(person)[1].toUpperCase();
    return name.includes(nameInput);
  });
  if (filtered.length === 0) {
    domUpdates.noUserFound();
  }
  filtered.forEach(guest => domUpdates.displayFilteredCustomers(guest));
}

function findUserFromSelect(selected) {
  return window.customers.find(person => {
    return person.id === parseInt(selected);
  });
}

function createGuest(e) {
  e.preventDefault(e);
  let nameInput = $("#customer-search-input").val();
  let newGuestId = window.customers.length + 1;
  let newGuestObject = {
    id: newGuestId,
    name: nameInput
  };
  let newGuest = new Guest(newGuestObject);
  window.customers.push(newGuest);
  window.currentCustomer = newGuest;
  domUpdates.changeName(newGuest);
  domUpdates.displayErrorsForNoCustomerData(nameInput);
  domUpdates.displayValidCustomerButtons();
}

function filterForCustomerData() {
  let selected = $("#name-option").val();
  let user = findUserFromSelect(selected);
  let userBookings = findCustomerData(selected, bookingRepo.data, user);
  let userRoomServices = findCustomerData(selected, roomServiceRepo.data, user);
  window.currentCustomer = user;
  appendUserBookingsData(userBookings);
  appendUserRoomServiceData(userRoomServices);
  totalMoneySpentOnRoomService(user);
  moneySpentOnRoomService(getDate(), user);
  domUpdates.changeName(user);
  domUpdates.displayValidCustomerButtons();
}

function findCustomerData(selected, data, user) {
  let filtered = data.filter(log => {
    return log.userID === parseInt(selected);
  });
  if (filtered.length === 0) {
    domUpdates.displayErrorsForNoCustomerData(data, user);
  }
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
  let allOrders = roomServiceRepo.data.filter(order => {
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
  let ordersToday = roomServiceRepo.data.filter(order => {
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
  roomServiceRepo.allDailyOrderedItems(date);
}

function updateBookingsToDate() {
  let date = $("#bookings-calendar")
    .val()
    .split("-")
    .join("/");
  domUpdates.appendBookingsTable();
  bookingRepo.showBookedRooms(date, allData.rooms);
}

// function generateBookingForm() {
//   domUpdates.
// }
