import axios, {AxiosResponse} from 'axios';
import {ActionType} from './actionsType';
import {apiID} from '../../constants/constants';
import {FETCH_WEATHER_REQUEST} from '../../types/requestTypes';
import {ACTION} from '../../types/commonTypes';
import {WEATER_RESPONSE} from '../../types/responseTypes';

export const fetchWeather = ({lat, long}: FETCH_WEATHER_REQUEST) => {
  return async function (dispatch: (action: ACTION) => void) {
    dispatch({
      type: ActionType.FETCH_WEATHER,
      payload: {
        isLoading: true,
      },
    });

    const res: AxiosResponse<WEATER_RESPONSE> = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiID}`,
    );

    dispatch({
      type: ActionType.FETCH_WEATHER,
      payload: {
        isLoading: false,
        weather: res?.data,
      },
    });
  };
};
export const fetchWeatherList = ({lat, long}: FETCH_WEATHER_REQUEST) => {
  return async function (dispatch: (action: ACTION) => void) {
    dispatch({
      type: ActionType.FETCH_WEATHER_LIST,
      payload: {
        isLoading: true,
      },
    });
    const res = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=metric&appid=${apiID}&exclude=current,minutely,hourly,alerts`,
    );
    dispatch({
      type: ActionType.FETCH_WEATHER_LIST,
      payload: {
        isLoading: false,
        weatherList: res?.data?.daily?.slice(0, 5),
      },
    });
  };
};
