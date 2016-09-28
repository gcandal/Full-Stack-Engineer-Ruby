import { combineReducers } from "redux"
import {
    PREVIOUS_PAGE, NEXT_PAGE,
    SET_SEARCH_TEXT, REQUEST_COMICS,
    RECEIVE_COMICS, MARK_FAVORITE,
    UNMARK_FAVORITE
} from "./actions"

function page(state = 0, action) {
    switch(action.type) {
        case PREVIOUS_PAGE:
            return Math.min(0, state - 1);
        case NEXT_PAGE:
            return state + 1;
        default:
            return state
    }
}

function searchText(state = "", action) {
    switch(action.type) {
        case SET_SEARCH_TEXT:
            return action.text;
        default:
            return state
    }
}

function comic(state, action) {
    if(state.id !== action.id) {
        return state;
    }
    switch(action.type) {
        case MARK_FAVORITE:
            return Object.assign({}, state, {
                liked: true
            });
        case UNMARK_FAVORITE:
            return Object.assign({}, state, {
                liked: false
            });
        default:
            return state;
    }
}

function comics(state = [], action) {
    switch(action.type) {
        case RECEIVE_COMICS:
            return action.comics;
        case UNMARK_FAVORITE:
        case MARK_FAVORITE:
            return state.map(c => comic(c, action));
        default:
            return state;
    }
}

function isGetting(state = false, action) {
    switch(action.type) {
        case RECEIVE_COMICS:
            return false;
        case REQUEST_COMICS:
            return true;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    page,
    searchText,
    comics,
    isGetting
});

export default rootReducer
