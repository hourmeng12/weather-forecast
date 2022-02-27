import { createContext, useState, useEffect, useReducer } from 'react';
import { initialState } from '../state';
import { reducers } from '../state/reducers';
import { actions } from '../state/actions';

export const WeatherContext = createContext({
  ...initialState,
  getForecast: () => {},
});

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [isCelsius, setIsCelsius] = useState(true);

  const getForecast = async (coordinates = 'Phnom Penh') => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=781c4de229e44378bc541422222502&q=${coordinates}&days=3&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const { current, forecast, location } = data;

      dispatch({
        type: actions.setForecast,
        payload: {
          current,
          forecast: forecast.forecastday,
          location: `${location.name}, ${location.region}`,
        },
      });
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <WeatherContext.Provider
      value={{ getForecast, isCelsius, setIsCelsius, state }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
