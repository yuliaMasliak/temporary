import {
  currentPage,
  modifyCount,
  carBrands,
  carModels,
  base,
  basePath,
  createQuery,
  stoppedCars,
  currentWinnerPage,
  countWinners,
  modifyCountWinners,
} from './variables';
import { allRacingCars, counter, inputCarName, inputCarColor, winnerPost } from './pageElements';
import { moveCar, stopCar, pauseCar } from './racings';
import { winnersTotalBlock } from './pagination';
import { createSortedWinnerList } from './winnersSorting';

const getGarage = async (queryParameters) => {
  const response = await fetch(`${base}${basePath.garage}${createQuery(queryParameters)}`);
  const cars = await response.json();
  return cars;
};

const basis = async () => {
  const cars = await getGarage([
    { key: '_page', value: currentPage },
    { key: '_limit', value: 7 },
  ]);

  allRacingCars.forEach((el) => el.remove());
  return cars;
};

const resultCountCar = async () => {
  const response = await fetch(
    `${base}${basePath.garage}${createQuery([{ key: '_page', value: '0' }])}`
  );
  const countCar = Number(response.headers.get('X-Total-Count'));
  counter.innerHTML = `Cars in garage: ${countCar}`;
  modifyCount(countCar);
  return countCar;
};

const deleteWinner = async (id) => {
  try {
    const response = await fetch(`${base}${basePath.winners}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(response.statusText);
    const car = await response.json();
    return car;
  } catch (err) {
    console.log('Caught error: status 404 - car was not found among winners');
    return id;
  }
};

const deleteCar = async (id) => {
  const response = await fetch(`${base}${basePath.garage}/${id}`, {
    method: 'DELETE',
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const car = await response.json();
    resultCountCar();
    deleteWinner(id);
    return car;
  } catch (err) {
    console.log('Caught error: status 404 - car was not found in the garage');
    return id;
  }
};

const generateOneCar = async () => {
  if (inputCarName.value === '') {
    inputCarName.value = 'Car';
  }
  const car = {
    name: inputCarName.value,
    color: inputCarColor.value,
  };

  const response = await fetch(`http://127.0.0.1:3000/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const carData = await response.json();
  response.id = carData.id;
  addCars(carData.name, carData.color, carData.id);
  resultCountCar();
};

const makeRandomCar = () => {
  const carBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const carModel = carModels[Math.floor(Math.random() * carModels.length)];
  return `${carBrand} ${carModel}`;
};
const makeRandomColor = () => {
  const signs = '0123456789ABCDEF';
  let randomColor = '#';
  for (let col = 0; col < 6; col += 1) {
    randomColor += signs[Math.floor(Math.random() * signs.length)];
  }
  return randomColor;
};

const generate100Cars = async () => {
  for (let car = 0; car <= 99; car += 1) {
    const carItem = {
      name: makeRandomCar(),
      color: makeRandomColor(),
    };
    // eslint-disable-next-line no-await-in-loop
    await fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carItem),
    })
      .then((response) => response.json())
      .then((carItems) => {
        addCars(carItems.name, carItems.color);
      });
    resultCountCar();
  }
  basis();
};

const driveEngine = async (id) => {
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: 'id', value: id },
        { key: 'status', value: 'drive' },
      ])}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const success = await response.json();
    return success;
  } catch (err) {
    pauseCar(id);
    console.log("Car has been stopped suddenly. It's engine was broken down.");
    return id;
  }
};

const startEngine = async (id) => {
  winnerPost.innerHTML = '';
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: 'id', value: id },
        { key: 'status', value: 'started' },
      ])}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const car = await response.json();
    driveEngine(id);
    moveCar(id, car.velocity);
  } catch (err) {
    console.log('Car was not found');
  }
};

const startEngineAll = async (id) => {
  try {
    const response = await fetch(
      `${base}${basePath.engine}${createQuery([
        { key: 'id', value: id },
        { key: 'status', value: 'started' },
      ])}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const car = await response.json();
    moveCar(id, car.velocity);
    winnerPost.innerHTML = '';
    return car;
  } catch (err) {
    console.log('Car was not found');
    return id;
  }
};

const stopEngine = async (id) => {
  const response = await fetch(
    `${base}${basePath.engine}${createQuery([
      { key: 'id', value: id },
      { key: 'status', value: 'stopped' },
    ])}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const stoppedVelocity = await response.json();
  console.log(stoppedVelocity);
  stoppedCars.push(id);
  stopCar(id);
  return stoppedVelocity;
};

const getWinners = async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: '_limit', value: '10' },
      { key: '_page', value: currentWinnerPage },
    ])}`,
    {
      method: 'GET',
    }
  );
  const winners = await response.json();
  const countWinner = Number(response.headers.get('X-Total-Count'));

  modifyCountWinners(countWinner);
  winnersTotalBlock.innerHTML = `Winners: ${countWinners} cars`;
  return winners;
};

const updateWinner = async (id, time) => {
  const existingWinners = await getWinners();
  const winnerToUpdate = {
    wins: 0,
    time,
  };
  existingWinners.forEach((el) => {
    if (el.id === id) {
      winnerToUpdate.wins = el.wins + 1;
      if (el.time < winnerToUpdate.time) {
        winnerToUpdate.time = el.time;
      }
    }
  });
  const response = await fetch(`${base}${basePath.winners}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerToUpdate),
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const updatedWinner = await response.json();
    return updatedWinner;
  } catch (err) {
    console.log('Caught error: status 404 - winner was not found in the garage');
    return id;
  }
};

const createWinner = async (id, time) => {
  try {
    const definedWinner = {
      id,
      wins: 1,
      time,
    };
    const response = await fetch(`${base}${basePath.winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definedWinner),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('Error: Insert failed, duplicate id');
    return id;
  }
};

const getSingleWinner = async (id) => {
  const response = await fetch(`${base}${basePath.winners}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const winner = await response.json();
  return winner;
};

const removeStoppedCarfromWinners = async (id, time) => {
  const existingWinner = await getSingleWinner(id);

  const winnerToRemove = {
    wins: 0,
    time: existingWinner.time,
  };
  let removeUpdatedWinner = await createWinner(id, time);
  if (!removeUpdatedWinner) {
    removeUpdatedWinner = await updateWinner(id, time);
  }
  stoppedCars.forEach((el) => {
    if (el === removeUpdatedWinner.id) {
      if (removeUpdatedWinner.wins > 1) {
        winnerToRemove.wins = removeUpdatedWinner.wins - 1;
        winnerToRemove.time = el.time;
      }
    }
  });
  try {
    await fetch(`${base}${basePath.winners}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winnerToRemove),
    });
  } catch (err) {
    deleteWinner(id);
  }
};

const updateCar = async (id, body) => {
  const response = await fetch(`${base}${basePath.garage}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  try {
    if (!response.ok) throw new Error(response.statusText);
    const updatedCar = await response.json();
    return updatedCar;
  } catch (err) {
    console.log('Caught error: status 404 - car was not found in the garage');
    return id;
  }
};

document.getElementById('up-arrow-time').addEventListener('click', async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: '_limit', value: '10' },
      { key: '_page', value: currentWinnerPage },
      { key: '_sort', value: 'time' },
      { key: '_order', value: 'DESC' },
    ])}`,
    {
      method: 'GET',
    }
  );
  const winners = await response.json();
  createSortedWinnerList(winners);
});

document.getElementById('down-arrow-time').addEventListener('click', async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: '_limit', value: '10' },
      { key: '_page', value: currentWinnerPage },
      { key: '_sort', value: 'time' },
      { key: '_order', value: 'ASC' },
    ])}`,
    {
      method: 'GET',
    }
  );
  const winners = await response.json();
  createSortedWinnerList(winners);
});

document.getElementById('up-arrow-wins').addEventListener('click', async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: '_limit', value: '10' },
      { key: '_page', value: currentWinnerPage },
      { key: '_sort', value: 'wins' },
      { key: '_order', value: 'DESC' },
    ])}`,
    {
      method: 'GET',
    }
  );
  const winners = await response.json();
  createSortedWinnerList(winners);
});

document.getElementById('down-arrow-wins').addEventListener('click', async () => {
  const response = await fetch(
    `${base}${basePath.winners}${createQuery([
      { key: '_limit', value: '10' },
      { key: '_page', value: currentWinnerPage },
      { key: '_sort', value: 'wins' },
      { key: '_order', value: 'ASC' },
    ])}`,
    {
      method: 'GET',
    }
  );
  const winners = await response.json();
  createSortedWinnerList(winners);
});

export {
  resultCountCar,
  deleteCar,
  deleteWinner,
  basis,
  generateOneCar,
  generate100Cars,
  getGarage,
  startEngine,
  startEngineAll,
  stopEngine,
  updateWinner,
  getWinners,
  removeStoppedCarfromWinners,
  driveEngine,
  updateCar,
};
