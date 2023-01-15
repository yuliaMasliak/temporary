import { updateCar } from './API';

const inputNameUpdate = document.querySelector('.input-car-update');
const inputColorUpdate = document.querySelector('.input-car-color-update');
const updateButton = document.querySelector('.btn-update-car');

function selectCar(carID, carName) {
  const activeBlock = document.getElementById(carID);
  const allActive = document.querySelectorAll('.active');
  allActive.forEach((i) => i.classList.remove('active'));
  activeBlock.classList.add('active');
  inputNameUpdate.value = carName;
  updateButton.removeAttribute('disabled');
}

const updateCarFunc = async () => {
  const carToChange = document.querySelector('.active');
  const carToChangeId = Number(carToChange.id);
  await updateCar(carToChangeId, {
    name: inputNameUpdate.value,
    color: inputColorUpdate.value,
  });
  const changeName = document.getElementById(`${carToChangeId}-name`);
  changeName.innerHTML = inputNameUpdate.value;
  const changeColor = document.getElementById(`${carToChangeId}-color`);
  changeColor.setAttribute('style', `color:${inputColorUpdate.value}`);
  updateButton.disabled = true;
  inputNameUpdate.value = '';
};

updateButton.addEventListener('click', updateCarFunc);

export { selectCar };
