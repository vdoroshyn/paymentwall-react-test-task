import { 
  UPDATE_SELECTED_COUNTRY,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR
} from "../actions/actionTypes";

const initialState = {
  countries: [],
  selectedCountry: null
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.countryCode
      }
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries
      }
    case GET_COUNTRIES_ERROR:
      console.log('There was an error fetching the countries', action.err);
      return state;
    default:
      return state;
  }
};

export default countriesReducer;
