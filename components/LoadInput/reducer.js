import { STOPS_MIN_LENGTH, TYPES } from './constants';

const initialState = {
  start: [
    {
      label: ''
    }
  ],
  stops: [{ label: '' }, { label: '' }]
};

const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === TYPES.START) {
    return {
      ...state,
      start: [payload]
    };
  }

  if (type.includes(TYPES.STOP)) {
    const stopNumber = type.split('-')[1];
    const stops = [...state.stops];
    stops[stopNumber] = payload;
    return {
      ...state,
      stops
    };
  }

  if (type === TYPES.ADD) {
    const stops = [...state.stops];
    stops.push({ label: '' });
    return {
      ...state,
      stops
    };
  }

  if (type === TYPES.REMOVE && state.stops.length > STOPS_MIN_LENGTH) {
    const stops = [...state.stops];
    stops.splice(payload, 1);
    return {
      ...state,
      stops
    };
  }

  return state;
};

export { initialState, reducer, STOPS_MIN_LENGTH };
