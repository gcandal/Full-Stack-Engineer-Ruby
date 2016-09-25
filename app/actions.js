import fetch from "isomorphic-fetch"
import MD5 from "crypto-js/md5"

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

function requestComics(text, page) {
    return {type: REQUEST_COMICS, text, page}
}

const getComicYear = ({ dates }) => parseInt(dates.filter(({ type, date }) => type == "focDate")[0].date.slice(0, 4));

export function receiveComics(json) {
    return {
        type: RECEIVE_COMICS,
        comics: json.data.results.map((comic) => (
            {
                id: comic.id,
                title: comic.title,
                issueNr: comic.issueNumber? comic.issueNumber : 0,
                year: getComicYear(comic),
                imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            }
        ))
    }
}

function comicsAlreadyLoaded(state, text, page) {
    return !state.isGetting && state.comics.length > 0 && state.searchText == text && state.page == page;
}

const baseUrl = "http://gateway.marvel.com/v1/public/";
const publicKey = "1cc91305c44f0b038a170b921826744c";
const privateKey = "6dd6d741dbc86dbee478f35ed825a15ee037782a";
const PAGE_OFFSET = 20;

const buildHash = (timestamp) => ( MD5(timestamp + privateKey + publicKey) );

const buildUrl = (page) => {
    const timestamp = Date.now();
    const hash = buildHash(timestamp);
    return `${baseUrl}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${page * PAGE_OFFSET}`;
};

function getComics(text, page) {
    return function (dispatch) {
        dispatch(requestComics(text, page));
        return fetch(buildUrl(page))
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