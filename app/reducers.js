import { combineReducers } from "redux"
import {
    PREVIOUS_PAGE, NEXT_PAGE,
    SET_SEARCH_TEXT, REQUEST_COMICS,
    RECEIVE_COMICS
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

function comics(state = [], action) {
    switch(action.type) {
        case RECEIVE_COMICS:
            return action.comics;
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
