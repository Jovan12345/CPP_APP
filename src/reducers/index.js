import {combineReducers} from 'redux';

import photoReducer from './photoReducer';
import photoLocationReducer from './photoLocationReducer'

export default combineReducers({
    photos: photoReducer,
    photoCity: photoLocationReducer
})
