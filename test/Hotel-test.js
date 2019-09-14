import chai from 'chai';
import spies from 'chai-spies';
import Hotel from '../src/Hotel.js';
import bookings from '../data/bookings.js';
import rooms from '../data/rooms.js';
import roomServices from '../data/roomServices.js';
import users from '../data/users.js';
const expect = chai.expect;
chai.use(spies);

let hotel;

beforeEach(() => {
  hotel = new Hotel(users, bookings, rooms, roomServices);
});

describe('Hotel', () => {
  it('should be an instance of Hotel', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceof(Hotel);
  })

  it('should get total rooms available on current date', () => {
    expect(hotel.totalRoomsAvailable).to.be.a('function');
    expect(hotel.totalRoomsAvailable('2019/07/28')).to.eql([]);
  })

  it('should ')
})
