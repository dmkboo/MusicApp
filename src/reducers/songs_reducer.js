import { SHOW_SONGS } from '../actions/types'
const initialState = {
  list: []
}
export function showSongs(state = initialState, action){
  switch (action.type){
    case SHOW_SONGS:
      return Object.assign({}, state, {list: action.payload})
    default:
      return state
  }
}
