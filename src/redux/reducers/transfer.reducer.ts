import { actionTypes } from "../../constants/action-types"
import { initialState } from "./initial-state";

const transferReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case actionTypes.ADD_ACTIVITY:
      return { ...state, transfers: [...state.transfers, action.payload] }
  }
  return state
}

export default transferReducer

