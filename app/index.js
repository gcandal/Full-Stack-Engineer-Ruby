import React from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"

import { tryGetComics } from "./actions"
import rootReducer from "./reducers"

import Marvel from "./containers/Marvel"

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

render(<Marvel store={store}/>, document.getElementById("app"));

store.dispatch(tryGetComics("", 0));
