import {ACTION} from '../../types/commonTypes';
import {WEATER_RESPONSE} from '../../types/responseTypes';
import {ActionType} from '../actions/actionsType';

type InitialStateType = {
  weather: {
    isLoading?: boolean;
    weatherData?: WEATER_RESPONSE;
  };
  weatherList: {
    isLoading?: boolean;
    weatherListData?: Array<WEATER_RESPONSE>;
  };
};

const initialState: InitialStateType = {
  weather: {
    weatherData: undefined,
  },
  weatherList: {
    weatherListData: [],
  },
};

export const WeatherReducer = (state = initialState, action: ACTION) => {
  switch (action.type) {
    case ActionType.FETCH_WEATHER: {
      return {
        ...state,
        weather: {
          isLoading: action.payload?.isLoading ?? state?.weather?.isLoading,
          weatherData: action.payload?.weather ?? state?.weather?.weatherData,
        },
      };
    }
    case ActionType.FETCH_WEATHER_LIST: {
      return {
        ...state,
        weatherList: {
          isLoading: action.payload?.isLoading ?? state?.weatherList?.isLoading,
          weatherListData:
            action.payload?.weatherList ?? state?.weatherList?.weatherListData,
        },
      };
    }
    default:
      return state;
  }
};
