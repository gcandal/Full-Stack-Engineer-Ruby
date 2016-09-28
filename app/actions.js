import fetch from "isomorphic-fetch"

export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const REQUEST_COMICS = "REQUEST_COMICS";
export const RECEIVE_COMICS = "RECEIVE_COMICS";
export const MARK_FAVORITE = "MARK_FAVORITE";
export const UNMARK_FAVORITE = "UNMARK_FAVORITE";

export function previousPage() {
    return {type: PREVIOUS_PAGE}
}

export function nextPage() {
    return {type: NEXT_PAGE}
}

export function setSearchText(text) {
    return {type: SET_SEARCH_TEXT, text}
}

function requestComics(text, page) {
    return {type: REQUEST_COMICS, text, page}
}

function receiveComics(comics) {
    return {
        type: RECEIVE_COMICS,
        comics: comics
    }
}

function markFavorite(id) {
    return {type: MARK_FAVORITE, id: id}
}

function unmarkFavorite(id) {
    return {type: UNMARK_FAVORITE, id: id}
}

function comicsAlreadyLoaded(state, text, page) {
    return !state.isGetting && state.comics.length > 0 && state.searchText == text && state.page == page;
}

function getComics(text, page) {
    return function (dispatch) {
        dispatch(requestComics(text, page));
        return fetch(buildGetUrl(text, page))
            .then(response => response.json())
            .then(json =>
                dispatch(receiveComics(json))
            );
    }
}

export function forceGetComics(text, page) {
    return function (dispatch) {
        return dispatch(getComics(text, page));
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

const BASE_URL = "http://localhost:9292/v1/";

const buildGetUrl = (text, page) => {
    return `${BASE_URL}comics?page=${page}&character=${text}`;
};

const buildPutUrl = (id, like) => {
    return `${BASE_URL}comic/${id}/${like? "like" : "unlike"}`;
};

function setFavorite(id, liked) {
    return function (dispatch) {
        return fetch(buildPutUrl(id, liked), {method: "put"})
            .then(() => dispatch(liked? markFavorite(id) : unmarkFavorite(id)));
    }
}

export function saveMarkFavorite(id) {
    return function (dispatch) {
        return dispatch(setFavorite(id, true));
    }
}

export function saveUnmarkFavorite(id) {
    return function (dispatch) {
        return dispatch(setFavorite(id, false));
    }
}
