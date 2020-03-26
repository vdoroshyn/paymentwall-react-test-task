import countriesReducer from './countriesReducer';
import formReducer from './formReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  countries: countriesReducer,
  form: formReducer
});

export default rootReducer;
