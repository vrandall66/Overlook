import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking.js';
import bookings from '../data/bookings.js';
import rooms from '../data/rooms.js';

let booking;

beforeEach(() => {
  booking = new Booking(rooms, bookings)
});

describe('Booking', () => {
  it('should be an instance of Booking', () => {
    expect(Booking).to.be.a('function');
    expect(booking).to.be.an.instanceof(Booking);
  })

  it('should be able to find all available rooms for a given day', () => {
    expect(booking.findBookedRooms).to.be.a('function');
    expect(booking.findBookedRooms('2019/07/28')).to.eql([
      { "date": "2019/07/28", "roomNumber": 1, "userID": 91 },
      { "date": "2019/07/28", "roomNumber": 2, "userID": 87 },
      { "date": "2019/07/28", "roomNumber": 8, "userID": 5 },
      { "date": "2019/07/28", "roomNumber": 10, "userID": 94 },
      { "date": "2019/07/28", "roomNumber": 14, "userID": 53 },
      { "date": "2019/07/28", "roomNumber": 17, "userID": 62 },
      { "date": "2019/07/28", "roomNumber": 18, "userID": 4 },
      { "date": "2019/07/28", "roomNumber": 19, "userID": 46 },
      { "date": "2019/07/28", "roomNumber": 20, "userID": 50 },
      { "date": "2019/07/28", "roomNumber": 22, "userID": 44 },
      { "date": "2019/07/28", "roomNumber": 28, "userID": 38 },
      { "date": "2019/07/28", "roomNumber": 31, "userID": 55 },
      { "date": "2019/07/28", "roomNumber": 36, "userID": 77 },
      { "date": "2019/07/28", "roomNumber": 37, "userID": 14 },
      { "date": "2019/07/28", "roomNumber": 40, "userID": 38 },
      { "date": "2019/07/28", "roomNumber": 47, "userID": 27 }
    ]);
  })

  it('should give a number of available rooms for a given day', () => {
    expect(booking.totalRoomsAvailableToday).to.be.a('function');
    expect(booking.totalRoomsAvailableToday('2019/07/28')).to.equal(34)
  })

  it('should calculate the total revenue from bookings on a given date', () => {
    expect(booking.totalBookingRevenueToday).to.be.a('function');
    expect(booking.totalBookingRevenueToday('2019/07/28')).to.equal(4790.64)
  })

  it('should calculate the percentage of occupied rooms for a given day', () => {
    expect(booking.percentageOfRoomsOccupiedToday).to.be.a('function');
    expect(booking.percentageOfRoomsOccupiedToday('2019/07/28')).to.equal(32)
  })
})