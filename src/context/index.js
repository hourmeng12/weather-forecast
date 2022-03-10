import { createContext, useState, useEffect, useReducer } from 'react';
import { initialState } from '../state';
import { reducers } from '../state/reducers';
import { actions } from '../state/actions';

export const WeatherContext = createContext({
  state: initialState,
  isCelsius: true,
  setIsCelsius: () => {},
  getForecast: () => {},
});

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [isCelsius, setIsCelsius] = useState(true);

  const getForecast = async (destination = 'auto:ip') => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${destination}&days=3&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
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
    } catch (error) {
      console.log(`Error: ${error}`);
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
