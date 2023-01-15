import { winnersPage } from './pageElements';
import { basis, getWinners } from "./API";
import { winnersList, createWinnerList } from './racingResult';
import {
  currentPage,
  countWinners,
  currentWinnerPage,
  count,
  modifyCurrentWinnerPage,
  modifyCurrentPage,
} from './variables';

const pageButton = document.createElement('button');
pageButton.setAttribute('id', 'page-button');

const pagePrev = document.createElement('button');
pagePrev.setAttribute('id', 'prev-button');
pagePrev.innerHTML = 'Prev';

const pageNext = document.createElement('button');
pageNext.setAttribute('id', 'next-button');
pageNext.innerHTML = 'Next';

const paginatedList = document.querySelector('.racing-block');

const paginationContainer = document.createElement('nav');
paginationContainer.appendChild(pagePrev);
paginationContainer.appendChild(pageButton);
paginationContainer.appendChild(pageNext);
paginatedList.append(paginationContainer);

// Garage page pagination
pageButton.innerHTML = currentPage;
pageNext.addEventListener('click', () => {
  if (count < 7 || pageButton.innerHTML === Math.ceil(count / 7)) {
    pageNext.classList.add('disabled');
  } else {
    pageNext.classList.remove('disabled');
    modifyCurrentPage(currentPage + 1);
    pageButton.innerHTML = currentPage;
    basis();
  }
});

pagePrev.addEventListener('click', () => {
  if (pageButton.innerHTML === 1) {
    pagePrev.classList.add('disabled');
  } else {
    pagePrev.classList.remove('disabled');
    modifyCurrentPage(currentPage - 1);
    pageButton.innerHTML = currentPage;
    basis();
  }
});

// winners page pagination content
const winnersPageButton = document.createElement('button');
winnersPageButton.setAttribute('id', 'winners-page-button');

const winnersPagePrev = document.createElement('button');
winnersPagePrev.setAttribute('id', 'winners-prev-button');
winnersPagePrev.innerHTML = 'Prev';

const winnersPageNext = document.createElement('button');
winnersPageNext.setAttribute('id', 'winners-next-button');
winnersPageNext.innerHTML = 'Next';

const winnersPaginationContainer = document.createElement('nav');
winnersPaginationContainer.appendChild(winnersPagePrev);
winnersPaginationContainer.appendChild(winnersPageButton);
winnersPaginationContainer.appendChild(winnersPageNext);

const winnersTotalBlock = document.createElement('div');
winnersPage.append(winnersTotalBlock);
winnersPage.append(winnersPaginationContainer);
winnersPage.append(winnersList);
document.body.append(winnersPage);

winnersPageButton.innerHTML = currentWinnerPage;

winnersPageNext.addEventListener('click', () => {
  if (countWinners <= 10 || winnersPageButton.innerHTML === Math.ceil(countWinners / 7)) {
    winnersPageNext.classList.add('disabled');
  } else {
    winnersPageNext.classList.remove('disabled');
    modifyCurrentWinnerPage(currentWinnerPage + 1);
    winnersPageButton.innerHTML = currentWinnerPage;
    getWinners();
    createWinnerList();
  }
});

winnersPagePrev.addEventListener('click', () => {
  if (winnersPageButton.innerHTML === 1) {
    winnersPagePrev.classList.add('disabled');
  } else {
    winnersPagePrev.classList.remove('disabled');
    modifyCurrentWinnerPage(currentWinnerPage - 1);
    winnersPageButton.innerHTML = currentWinnerPage;
    getWinners();
    createWinnerList();
  }
});

export {
  pageNext,
  pagePrev,
  pageButton,
  winnersPageNext,
  winnersPagePrev,
  winnersPageButton,
  winnersTotalBlock,
};
