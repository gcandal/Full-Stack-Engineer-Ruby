import React from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"

import rootReducer from "./reducers"

import MarvelContainer from "./containers/Marvel"

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

render(<MarvelContainer store={store}/>, document.getElementById("app"));