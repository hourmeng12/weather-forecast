import { actions } from './actions';

export const reducers = (state, action) => {
  switch (action.type) {
    case actions.setForecast:
      const { current, forecast, location } = action.payload;
      return {
        ...state,
        current,
        forecast,
        location,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
