// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');


let users, rooms, bookings, roomServices;

onPageLoad();

function onPageLoad() {
  displayMain();
  getDate();
}

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json())
  .then(data => users = data.users)
  .then(data => console.log('users', users))
  .catch(err => console.log('users err', err));

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json())
  .then(data => rooms = data.rooms)
  .then(data => console.log('rooms', rooms))
  .catch(err => console.log('rooms err', err));

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json())
  .then(data => bookings = data.bookings)
  .then(data => console.log('bookings', bookings))
  .catch(err => console.log('bookings', err));

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json())
  .then(data => roomServices = data.roomServices)
  .then(data => console.log('roomServices', roomServices))
  .catch(err => console.log('roomServices err', err));

function displayMain () {
  $('.all-tabs section').hide();
  $('.all-tabs section:first').show();
  $('.tabs-nav li:first').addClass('current')
}

$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav li').removeClass('current');
  $(this).parent().addClass('current');
  $('.all-tabs section').hide();
  $($(this).attr('href')).show();
});

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;
  domUpdates.displayDate(today);
}