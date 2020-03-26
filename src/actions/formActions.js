import { CHANGE_IS_FORM_SUBMITTED } from "./actionTypes";

export const changeIsFormSubmitted = (bool) => {
  return {
    type: CHANGE_IS_FORM_SUBMITTED,
    bool
  }
};
