import { USER } from './type';

const loginAction = ({ id }) => ({
  type: USER.LOGIN,
  id,
});

const logoutAction = (id) => ({ type: USER.LOG_OUT, id });

const setError = (error) => ({ type: USER.ERROR, error });

export {
  loginAction,
  logoutAction,
  setError,
}