import { actionTypes } from '../../constants/action-types';

let nextUserId = 2

export function addUser(username: string, password: string) {
  return {
    type: actionTypes.ADD_USER,
    payload: { username: username, password: password, money: 0, id: ++nextUserId }
  }
}

export function loginUser(username: string, password: string) {
  return {
    type: actionTypes.LOGIN_USER,
    payload: { username: username, password: password }
  }
}

export function logoutUser() {
  return {
    type: actionTypes.LOGOUT_USER,
    payload: {}
  }

}

