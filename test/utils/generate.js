const faker = require('faker');

// Faker generators
// Common data
const getId = () => faker.random.uuid();
const getCity = () => faker.address.city();
const getState = () => faker.address.stateAbbr();
const getZipCode = () => faker.address.zipCode();

// Profile data
const getOktaId = () => faker.random.alphaNumeric(20);
const getImg = () => faker.image.avatar();
const getEmail = () => faker.internet.email();
const getName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;

// Location data
const getAddress = () => faker.address.streetAddress();
const getLocationName = () => faker.company.companyName();
const getPhoneNumber = () => faker.phone.phoneNumberFormat();
const getLat = () => faker.address.latitude();
const getLng = () => faker.address.longitude();

// Test object factory functions
// User
function buildUser(overrides = {}) {
  return {
    id: getId(),
    avatarUrl: getImg(),
    email: getEmail(),
    name: getName(),
    address: getAddress(),
    city: getCity(),
    state: getState(),
    zip: getZipCode(),
    ...overrides,
  };
}

// Location
function buildLocation(overrides = {}) {
  return {
    id: getId(),
    groomerId: getOktaId(),
    businessName: getLocationName(),
    address: getAddress(),
    city: getCity(),
    state: getState(),
    zip: getZipCode(),
    email: getEmail(),
    phoneNumber: getPhoneNumber(),
    lat: getLat(),
    lng: getLng(),
    ...overrides,
  };
}

// Response
function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('res.json'),
    status: jest.fn(() => res).mockName('res.status'),
    ...overrides,
  };
  return res;
}

// Request
function buildReq(overrides = {}) {
  const req = {
    body: {},
    params: {},
    ...overrides,
  };
  return req;
}

module.exports = {
  getId,
  getOktaId,
  getImg,
  getEmail,
  getName,
  getAddress,
  getLocationName,
  getPhoneNumber,
  getLat,
  getLng,
  getCity,
  getState,
  getZipCode,
  buildUser,
  buildLocation,
  buildRes,
  buildReq,
};
