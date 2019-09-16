import $ from "jquery";
import domUpdates from "./domUpdates";
import Hotel from "./Hotel.js";
import Guest from "./Guest.js";

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
$('#select-customer-button').on('click', filterForCustomerData);

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
    findUser(nameInput);
  }
}

function findUser(nameInput) {
  let filtered = allCustomers.filter(person => {
    let name = Object.values(person)[1].toUpperCase();
    return name.includes(nameInput);
  });
  filtered.forEach(guest => domUpdates.displayFilteredCustomers(guest));
}

function createGuest(e) {
  e.preventDefault(e);
  let nameInput = $("#customer-search-input").val();
  let newGuestId = allCustomers.length + 1;
  let newGuestObject = {
    id: newGuestId,
    name: nameInput
  }
  let newGuest = new Guest(newGuestObject);
  allCustomers.push(newGuest)
}

function filterForCustomerData() {
  let selected = $('#name-option').val();
  let bookings = allData.bookings.bookings;
  let roomService = allData.roomServices.roomServices;
  let userBookings = findCustomerData(selected, bookings);
  let userRoomServices = findCustomerData(selected, roomService);
  appendUserBookingsData(userBookings);
  appendUserRoomServiceData(userRoomServices);
}

function findCustomerData(selected, data) {
  let filtered = data.filter(log => {
    return log.userID == selected;
  });
  return filtered
}

function appendUserBookingsData(filteredData) {
  filteredData.forEach(log => {
    domUpdates.displayPreviousBookings(log);
  })
}

function appendUserRoomServiceData(filteredData) {
  filteredData.forEach(log => {
    domUpdates.displayPreviousRoomServices(log);
  })
}