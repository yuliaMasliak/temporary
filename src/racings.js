import { winnerPost, racingBlock } from './pageElements';
import { startEngineAll, driveEngine, removeStoppedCarfromWinners } from './API';

const moveCar = async (id, velocity) => {
  document
    .getElementById(`${id}-color`)
    .animate(
      [{ transform: 'translate(0)' }, { transform: `translate(${window.innerWidth - 180}px)` }],
      {
        duration: Math.ceil(window.innerWidth / velocity) * 300,
        fill: 'forwards',
      }
    );

  document.getElementById(`stop-${id}`).disabled = false;
  document.getElementById(`play-${id}`).disabled = true;
};

const stopCar = async (id) => {
  document
    .getElementById(`${id}-color`)
    .getAnimations()
    .forEach((anim) => anim.cancel());
  document.getElementById(`play-${id}`).disabled = false;
  document.getElementById(`stop-${id}`).disabled = true;
};

const pauseCar = async (id) => {
  document
    .getElementById(`${id}-color`)
    .getAnimations()
    .forEach((anim) => anim.pause());
};

const getWinner = async () => {
  const cars = document.querySelectorAll('.racing-car-block');
  const winner = {
    maxVelocity: 1,
    id: '',
  };
  const carsID = [];
  cars.forEach((car) => carsID.push(car.id));

  const promises = carsID.map(async (el) => {
    const racer = await startEngineAll(el);
    const success = await driveEngine(el);
    if (racer.velocity > winner.maxVelocity && success.success) {
      winner.maxVelocity = racer.velocity;
      winner.id = el;
      winner.time = Math.round(5000 / winner.maxVelocity);
    }
  });
  // await
  Promise.any(promises);
  const carsName = document.querySelectorAll('.car-model');
  carsName.forEach((el) => {
    if (el.id.replace('-name', '') === winner.id) {
      winner.name = el.innerHTML;
    }
  });

  winnerPost.classList.remove('.no-winner');
  winnerPost.innerHTML = `The Winner is ${winner.name} with time of ${winner.time} sec`;
  racingBlock.prepend(winnerPost);
  setTimeout(() => winnerPost.remove(), 5000);
  removeStoppedCarfromWinners(winner.id, winner.time);
  return winner;
};

export { getWinner, stopCar, moveCar, pauseCar };
