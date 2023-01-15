import { generate100Cars } from './generateCars';
import {
  titleGarage,
  titleWinners,
  garagePage,
  winnersPage,
  btnGenerateCars,
  btnCarCreate,
  inputCarColor,
  btnRace,
  btnReset,
  winnerPost,
} from './pageElements';
import { generateOneCar } from './generateOneCar';
import { pageButton, pageNext, pagePrev } from './pagination';

import { getWinner, stopEngine, stoppedCars } from './racings';
import { createWinnerList } from './racingResult';
import { basis } from './API';
import { renderCar } from './addCar';
import { resultCountCar } from './carsCounter';

basis();
resultCountCar();
winnersCounter();
renderCar();
//page switchers

titleGarage.addEventListener("click", () => {
  garagePage.classList.remove("hidden");
  winnersPage.classList.add("hidden");
});
titleWinners.addEventListener("click", () => {
  winnersPage.classList.remove("hidden");
  garagePage.classList.add("hidden");
  createWinnerList();
});

//cars generators
btnGenerateCars.addEventListener("click", generate100Cars);

inputCarColor.addEventListener("input", () => {
  inputCarColor.setAttribute("value", `${inputCarColor.value}`);
});

btnCarCreate.addEventListener("click", () => generateOneCar());

// racings

btnRace.addEventListener("click", async () => {
  getWinner();
  stoppedCars.length = 0;
  winnerPost.classList.remove("no-winner");
  winnerPost.classList.add("winner");
});

btnReset.addEventListener("click", async () => {
  stoppedCars.length = 0;
  const cars = document.querySelectorAll(".racing-car-block");
  for (const car of cars) {
    stopEngine(car.id);
    winnerPost.classList.remove("winner");
    winnerPost.classList.add("no-winner");
  }
});

export { pageNext, pageButton, pagePrev };
