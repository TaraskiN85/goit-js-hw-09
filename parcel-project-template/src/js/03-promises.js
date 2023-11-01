import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const createBtn = document.querySelector('.btn');

const [delay, step, amount, ...rest] = [...form.elements];

const promisesData = {
  delay,
  step,
  amount,
};

const createPromise = (position, delay) => {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    const promiseObj = {
      promisePosition: position,
      promiseDelay: delay,
    };
    setTimeout(() => {
      if (shouldResolve) {
        res(promiseObj);
      } else {
        rej(promiseObj);
      }
    }, delay);
  });

  return promise;
};

const createPromises = event => {
  event.preventDefault();
  for (let i = 0; i < promisesData.amount; i++) {
    createPromise(i + 1, promisesData.delay + i * promisesData.step)
      .then(({ promisePosition, promiseDelay }) => {
        Notify.success(
          `✅ Fulfilled promise ${promisePosition} in ${promiseDelay}ms`,
          {
            timeout: 3000,
          }
        );
      })
      .catch(({ promisePosition, promiseDelay }) => {
        Notify.failure(
          `❌ Rejected promise ${promisePosition} in ${promiseDelay}ms`,
          {
            timeout: 3000,
          }
        );
      });
  }
};

const addData = event => {
  promisesData[event.target.name] = +event.target.value;
};

form.addEventListener('input', addData);
createBtn.addEventListener('click', createPromises);
