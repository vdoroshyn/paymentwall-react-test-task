import { 
  UPDATE_SELECTED_COUNTRY,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR
} from "../actions/actionTypes";

export const updateSelectedCountry = (countryCode) => {
  return {
    type: UPDATE_SELECTED_COUNTRY,
    countryCode
  }
};

export const getCountries = () => {
  const countriesURL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';

  return (dispatch, getState) => {
    fetch(countriesURL)
      .then(response => response.json())
      .then(countries => {
        dispatch({ type: GET_COUNTRIES_SUCCESS, countries })
      }).catch((err) => {
        dispatch({ type: GET_COUNTRIES_ERROR, err })
      })
  }
};
