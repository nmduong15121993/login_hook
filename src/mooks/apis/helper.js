import { TIME_OUT_FETCH } from './constant';

/**
 * 
 * @param {*} data 
 * @param {*} error string
 * @returns 
 */
const fakePromise = (data, error) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!TIME_OUT_FETCH.status || error) {
      reject(new Error(error || 'Fetch data error !'));
    } else {
      resolve(data);
    }
  }, TIME_OUT_FETCH.time);
});

export { fakePromise };
