import { SET_IS_HEADER_VISIBLE } from "../actions/actionTypes";

const initialState = {
  isHeaderVisible: true,
};

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_IS_HEADER_VISIBLE:
      const { isHeaderVisible } = payload;
      return { ...state, isHeaderVisible: isHeaderVisible };
    default:
      return { ...state };
  }
};

export default uiReducer;
