import { USER } from './type';

export const userInit = {
  // id user đã login, nếu ko login ind = -1
  ind: -1,
  error: '',
};

const userReducer = (state, action) => {
  const mergeState = (newState) => ({ ...state, ...newState });
  
  switch (action.type) {
    case USER.LOGIN: {
      const { id } = action;
      return mergeState({ ind: +id });
    }
    case USER.LOG_OUT: {
      const { id } = action;
      if (id === state.ind) {
        return mergeState({ ind: -1 });
      }
      throw new Error('Logout error !');
    }

    case USER.ERROR: {
      const { error } = action;
      return mergeState({ error });
    }

    default: {
      throw new Error();
    }
  }
};

export { userReducer };
