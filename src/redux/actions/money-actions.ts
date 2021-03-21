import { actionTypes } from '../../constants/action-types';

export function addMoney(userId: number, quantity: number) {
  return {
    type: actionTypes.ADD_MONEY,
    payload: { userId: userId, quantity: quantity }
  }
}

export function addExpense(userId: number, quantity: number) {
  return {
    type: actionTypes.ADD_EXPENSE,
    payload: { userId: userId, quantity: quantity }
  }
}

export function transferMoney(senderId: number, recipientId: number, quantity: number) {
  return {
    type: actionTypes.TRANSFER_MONEY,
    payload: { senderId: senderId, recipientId: recipientId, quantity: quantity }
  }
}

export function addActivity(sender: number, quantity: number, recipient?: number) {
  return {
    type: actionTypes.ADD_ACTIVITY,
    payload: { sender: sender, quantity: quantity, recipient: recipient }
  }
}
