import { basis, resultCountCar } from './API';

const removeCarFunc = async (id) => {
  document.getElementById(id).remove();
  resultCountCar();
  basis();
};

const removeWinnerFunc = async (id) => {
  try {
    document.getElementById(`winners-list-to-add-${id}`).remove();
  } catch (er) {
    console.log('This car was not winner yet');
  }
};

export { removeCarFunc, removeWinnerFunc };
