import { combineReducers } from 'redux';
import { showSongs } from './songs_reducer';

const rootReducer = combineReducers({
  song: showSongs
});

export default rootReducer;
