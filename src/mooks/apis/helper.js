import { TIME_OUT_FETCH } from './constant';

const fakePromise = (data, isError = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isError) {
      reject(new Error('Fetch data error !'));
    } else {
      resolve(data);
    }
  }, TIME_OUT_FETCH);
});

export { fakePromise };
