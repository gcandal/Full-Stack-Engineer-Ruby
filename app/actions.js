import fetch from "isomorphic-fetch"

export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const REQUEST_COMICS = "REQUEST_COMICS";
export const RECEIVE_COMICS = "RECEIVE_COMICS";

export function previousPage() {
    return {type: PREVIOUS_PAGE}
}

export function nextPage() {
    return {type: NEXT_PAGE}
}

export function setSearchText(text) {
    return {type: SET_SEARCH_TEXT, text}
}

export function requestComics(text, page) {
    return {type: REQUEST_COMICS, text, page}
}

export function receiveComics(json) {
    return {
        type: RECEIVE_COMICS,
        comics: json.comics.map(comic => comic.data)
    }
}

function comicsAlreadyLoaded(state, text, page) {
    return !state.isGetting && state.searchText == text && state.page == page;
}

function getComics(text, page) {
    return function (dispatch) {
        dispatch(requestComics(text, page));

        return fetch("https://www.my-swear.com/api/ping")
            .then(response => response.json())
            .then(json =>
                dispatch(receiveComics({comics: [{yey: 1}]}))
            );
    }
}

export function tryGetComics(text, page) {
    return function (dispatch, getState) {
        if(comicsAlreadyLoaded(getState(), text, page)) {
            return Promise.resolve();
        }

        return dispatch(getComics(text, page));
    }
}