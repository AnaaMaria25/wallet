import { actionTypes } from "../../constants/action-types"
import { initialState } from "./initial-state"

const userReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case actionTypes.ADD_MONEY:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, money: (user.money + action.payload.quantity) }
            : user
        ),
      };
    case actionTypes.ADD_EXPENSE:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, money: (user.money - action.payload.quantity) }
            : user
        ),
      };
    case actionTypes.TRANSFER_MONEY:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.senderId ? { ...user, money: user.money - action.payload.quantity } : user.id === action.payload.recipientId ? { ...user, money: user.money + action.payload.quantity } : user
        ),
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        loggedUser: state.users.find((item) =>
          item.username === action.payload.username && item.password === action.payload.password
        )?.id
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        loggedUser: null
      };
  }

  return state
}

export default userReducer

