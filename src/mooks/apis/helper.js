import { TIME_OUT_FETCH } from './constant';

const fakePromise = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!TIME_OUT_FETCH.status) {
      reject(new Error('Fetch data error !'));
    } else {
      resolve(data);
    }
  }, TIME_OUT_FETCH.time);
});

export { fakePromise };
