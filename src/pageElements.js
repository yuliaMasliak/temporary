
const logo = document.createElement('div');
logo.classList.add('logo');
logo.innerHTML = '<img src="./src/images/logo.png" alt="logo" >';
document.body.append(logo);

// title button
const titleGarage = document.createElement('button');
titleGarage.classList.add('btn-title-garage');
titleGarage.innerHTML = 'To Garage';

const titleWinners = document.createElement('button');
titleWinners.classList.add('btn-title-winners');
titleWinners.innerHTML = 'To Winners';

document.body.append(titleGarage, titleWinners);

// Garage page, inputs blocks

const garagePage = document.createElement('div');
garagePage.classList.add('garage-page');
const userBlock = document.createElement('div');
userBlock.classList.add('.user-block');

const createCarBlock = document.createElement('div');
createCarBlock.classList.add('.create-car-block');

const inputCarName = document.createElement('input');
inputCarName.classList.add('input-car-create');
inputCarName.setAttribute('type', 'text');
inputCarName.onfocus = () => {
  inputCarName.value = '';
};

const inputCarColor = document.createElement('input');
inputCarColor.classList.add('input-car-color-create');
inputCarColor.setAttribute('type', 'color');
inputCarColor.setAttribute('value', '#e66465');

const btnCarCreate = document.createElement('button');
btnCarCreate.classList.add('btn-create-car');
btnCarCreate.innerHTML = 'create';
createCarBlock.append(inputCarName, inputCarColor, btnCarCreate);

const updateCarblock = document.createElement('div');
updateCarblock.classList.add('.update-car-block');
const inputCarUpdate = document.createElement('input');
inputCarUpdate.classList.add('input-car-update');
inputCarUpdate.setAttribute('type', 'text');

const inputCarColorUpdate = document.createElement('input');
inputCarColorUpdate.classList.add('input-car-color-update');
inputCarColorUpdate.setAttribute('type', 'color');
inputCarColorUpdate.setAttribute('value', '#97E265');

const btnCarUpdate = document.createElement('button');
btnCarUpdate.classList.add('btn-update-car');
btnCarUpdate.innerHTML = 'update';
btnCarUpdate.disabled = true;

updateCarblock.append(inputCarUpdate, inputCarColorUpdate, btnCarUpdate);

const btnGenerateCars = document.createElement('button');
btnGenerateCars.classList.add('btn-generte-car');
btnGenerateCars.innerHTML = 'generate <br>+100 cars';

const btnRace = document.createElement('button');
btnRace.classList.add('btn-race-car');
btnRace.innerHTML = 'Start race';
const btnReset = document.createElement('button');
btnReset.classList.add('btn-reset-car');
btnReset.innerHTML = 'Reset race';
const divGeneralBtns = document.createElement('div');
divGeneralBtns.append(btnGenerateCars, btnRace, btnReset);
const counter = document.createElement('div');
counter.classList.add('count');

const allRacingCars = document.querySelectorAll('.racing-car-block');
userBlock.append(createCarBlock, updateCarblock, divGeneralBtns, counter);

garagePage.append(userBlock);

// Winners page

const winnersPage = document.createElement('div');
winnersPage.classList.add('winners-page');
winnersPage.classList.add('hidden');

const winnersList = document.createElement('div');
winnersList.classList.add('winners-list');

const winnersListNumber = document.createElement('div');
winnersListNumber.classList.add('winner-number-main');
winnersListNumber.innerHTML = '#';
const winnersListBrand = document.createElement('div');
winnersListBrand.classList.add('winner-brand');
winnersListBrand.innerHTML = 'Car Brand';
const winnersListWins = document.createElement('div');
winnersListWins.classList.add('winner-wins');
winnersListWins.innerHTML = 'Wins';

const winnersListTime = document.createElement('div');
winnersListTime.classList.add('winner-time');
winnersListTime.innerHTML = 'Best<br>time (sec)';

const arrowWinsUp = document.createElement('button');
arrowWinsUp.classList.add('arrow-btn');
arrowWinsUp.id = 'up-arrow-wins';
arrowWinsUp.innerHTML = '&#8595';

const arrowWinsDown = document.createElement('button');
arrowWinsDown.classList.add('arrow-btn');
arrowWinsDown.id = 'down-arrow-wins';
arrowWinsDown.innerHTML = '&#8593';

const arrowTimeUp = document.createElement('button');
arrowTimeUp.classList.add('arrow-btn');
arrowTimeUp.id = 'up-arrow-time';
arrowTimeUp.innerHTML = '&#8595';

const arrowTimeDown = document.createElement('button');
arrowTimeDown.classList.add('arrow-btn');
arrowTimeDown.id = 'down-arrow-time';
arrowTimeDown.innerHTML = '&#8593';
winnersListWins.append(arrowWinsUp, arrowWinsDown);
winnersListTime.append(arrowTimeUp, arrowTimeDown);

winnersList.append(winnersListNumber, winnersListBrand, winnersListWins, winnersListTime);

// cars racing block

const racingBlock = document.createElement('div');
racingBlock.classList.add('racing-block');
garagePage.append(racingBlock);

const winnerPost = document.createElement('div');
winnerPost.classList.add('winner');

document.body.append(garagePage, winnersPage);

export {
  titleGarage,
  titleWinners,
  garagePage,
  winnersPage,
  racingBlock,
  counter,
  btnGenerateCars,
  btnCarCreate,
  inputCarColor,
  btnRace,
  btnReset,
  winnerPost,
  inputCarName,
  winnersList,
  allRacingCars,
};
