# Overlook Hotel Management

This is a rough draft of an inner hotel management application to oversee all bookings, customers, room service orders, and daily revenue for an individual hotel. Right now, users have the ability to:

- See a detailed list of which rooms are still available to book today
- Get an overview of percentage of rooms unoccuppied and exact number of current bookings today
- Look up a guest's profile and see
  - Previous booking information
  - Previous room service orders
- Filter all guests search by name
- Add a new guest
- See which rooms are still available on any given day
- A user can also find the busiest and slowest days of their upcoming year!

Through this project, I challenged myself to:

- Focus on object oriented programming and single responsibility principles
- Put all methods, functions, and DOM interaction functionality in the most efficient location
- Improve upon my test driven development skills and utilize Chai Spies for DOM manipulation

## Setup

### Clone Down and Run Locally

Fork and clone down this repo.

You will have to install the library dependencies

Type (or copy paste) these commands in your terminal at the _root_ of your cloned down directory

```bash
npm install
```

In the terminal, run:

```bash
npm start
```

Wait until the terminal is no longer outputting any information. Scroll through the install confirmation and find where it says:

Project is running at http://localhost:8080/
These numbers might differ ^^^

Open up http://localhost:8080/ in your browser to start using the app!

### Built with:

- HTML5
- CSS3
- SCSS
- ES6
- Mocha/Chai
- JQuery
- Webpack

## Screenshots

![Desktop View of the Homepage](images/Homepage.png "Desktop View of the Homepage")

![Desktop View of the Customers Tab](images/Customers.png "of the Customers Tab")

![Desktop View of the Bookings Tab while a current guest is selected](images/Bookings.png "Desktop View of the Bookings Tab while a current guest is selected")