const body = document.querySelector('.body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', true);

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

let colorCode, startChange;

const changecolor = () => {
  startChange = setInterval(() => {
    colorCode = getRandomHexColor();
    body.style.backgroundColor = `${colorCode}`;
  }, 1000);
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
};

const stopColoring = () => {
  clearInterval(startChange);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
};

startBtn.addEventListener('click', changecolor);
stopBtn.addEventListener('click', stopColoring);
