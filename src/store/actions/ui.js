import { SET_IS_HEADER_VISIBLE } from "./actionTypes";

export const setIsHeaderVisible = (value) => {
  console.log('setting ->', value)
  return {
    type: SET_IS_HEADER_VISIBLE,
    payload: {
        isHeaderVisible: value
    }
  };
};
