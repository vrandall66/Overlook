import $ from "jquery";
import domUpdates from "./domUpdates";
import Hotel from "./Hotel.js";
import Booking from "./Booking.js";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/base.scss";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

console.log("This is the JavaScript entry file - your code begins here.");

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
)
  .then(response => response.json())

let data = { customers: {}, rooms: {}, bookings: {}, roomServices: {} };

Promise.all([usersData, roomsData, bookingsData, roomServicesData])
  .then(values => {
    data['customers'] = values[0];
    data['rooms'] = values[1];
    data['bookings'] = values[2];
    data['roomServices'] = values[3];
    return data;
  }).then(data => new Hotel(data.customers, data.rooms, data.bookings, data.roomServices, getDate()))

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
  let todayDom = `${mm}/${dd}/${yyyy}`
  domUpdates.displayDate(todayDom);
  return today;
}
