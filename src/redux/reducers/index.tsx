import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import transferReducer from './transfer.reducer';

const rootReducer = combineReducers({
    userReducer,
    transferReducer
});

export default rootReducer;