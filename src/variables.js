export const base = 'http://127.0.0.1:3000';

export const basePath = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};
export const createQuery = (queryParameters = []) =>
  queryParameters.length
    ? `?${queryParameters.map((item) => `${item.key}=${item.value}`).join('&')}`
    : '';

export let currentPage = 1;
export let countWinners = 0;
export let currentWinnerPage = 1;
export let count = 0;
export const carBrands = [
  'Apollo',
  'Arash',
  'ARO',
  'Arrinera',
  'Artega',
  'Chrysler',
  'Dacia',
  'Daewoo',
  'DAF',
  'Daihatsu',
];

export const carModels = [
  'Durango',
  'Ram',
  'Challenger',
  'Charger',
  'Grand Caravan',
  'X7',
  'X5',
  'X3',
  'X6 M',
  'X6',
];
export let stoppedCars = [];
export function modifyCurrentPage(value) {
  currentPage = value;
}
export function modifyCountWinners(value) {
  countWinners = value;
}
export function modifyCurrentWinnerPage(value) {
  currentWinnerPage = value;
}
export function modifyCount(value) {
  count = value;
}
