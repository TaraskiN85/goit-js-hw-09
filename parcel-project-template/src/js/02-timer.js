import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const button = document.querySelector('button');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');

let selectedDate;
let timeDiff;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate - new Date() <= 0) {
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      button.removeAttribute('disabled');
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startCountdown = () => {
  button.setAttribute('disabled', true);
  const timer = setInterval(() => {
    timeDiff = selectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    if (timeDiff <= 1000) {
      clearInterval(timer);
      daysLeft.textContent = '00';
      hoursLeft.textContent = '00';
      minutesLeft.textContent = '00';
      secondsLeft.textContent = '00';
    } else {
      daysLeft.textContent = `${days}`.padStart(2, '0');
      hoursLeft.textContent = `${hours}`.padStart(2, '0');
      minutesLeft.textContent = `${minutes}`.padStart(2, '0');
      secondsLeft.textContent = `${seconds}`.padStart(2, '0');
    }
  }, 1000);
};

flatpickr('#datetime-picker', options);
button.addEventListener('click', startCountdown);
