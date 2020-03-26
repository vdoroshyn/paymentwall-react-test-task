const initialState = {
  countries: [],
  selectedCountry: ""
};

export const rootReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'UPDATE_SELECTED_COUNTRY':
      return {
        ...state,
        selectedCountry: action.countryCode
      }
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.countries
      }
    case 'GET_COUNTRIES_ERROR':
      console.log('There was an error fetching the countries', action.err);
      return state;
    default:
      return state;
  }
};
