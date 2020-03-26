import { 
  CHANGE_IS_FORM_SUBMITTED
} from "../actions/actionTypes";

const initialState = {
  isFormSubmitted: false
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_IS_FORM_SUBMITTED:
      return {
        ...state,
        isFormSubmitted: action.bool
      }
    default:
      return state;
  }
};

export default formReducer;
