// Thời gian lấy data
export const TIME_OUT_FETCH = (() => {
  // time
  const randomTimeOut = [1500, 2500, 3500, 1000, 500];

  // get index random
  const getIndRandom = (arrRandom) => {
    const indRandom = Math.floor(Math.random() * arrRandom.length);
    return indRandom;
  }
  // status
  const status = [false, true];
  return {
    time: randomTimeOut[getIndRandom(randomTimeOut)],
    status: status[getIndRandom(status)],
  };
})();