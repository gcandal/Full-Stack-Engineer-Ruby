import React, { Component, PropTypes } from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import { tryGetComics } from "./actions"
import rootReducer from "./reducers"

const VALUE_CHANGE_INTERVAL = 4000;
const ENTER_CHAR_CODE = 13;

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.timer_id = -1;
        this.state = {text: ""};
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.triggerSearch = this.triggerSearch.bind(this);
    }

    handleValueChange(e) {
        this.setState({text: e.target.value});
        this.stopTimer();
        this.timer_id = setTimeout(this.triggerSearch, VALUE_CHANGE_INTERVAL);
    }

    handleKeyPress(e) {
        if(e.charCode != ENTER_CHAR_CODE)
            return;
        e.preventDefault();
        this.triggerSearch();
    }

    stopTimer() {
        clearTimeout(this.timer_id);
        this.timer_id = -1;
    }

    triggerSearch() {
        this.props.onSearchChange(this.state.text);
        this.stopTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        return (
            <form className="search-form">
                <input value={this.state.text}
                       onKeyPress={this.handleKeyPress}
                       onChange={this.handleValueChange}
                       className="search-input" placeholder="Search for marvel characters or teams..."/>
            </form>
        )
    }
}

SearchInput.propTypes = {
    onSearchChange: PropTypes.func
};

var NavigationButtons = React.createClass({
    render: function() {
        return (
            <div className="navigation-buttons">
                <div className="previous button">Previous Page</div>
                <div className="next button">Next page</div>
                <div className="clearfix"></div>
            </div>
        )
    }
});

var Comic = React.createClass({
    getDefaultProps: function() {
        return {
            liked: false
        }
    },
    propTypes: {
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        issueNr: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired
    },
    render: function() {
        var classes = "comic" + (this.props.liked? " liked" : "");
        return (
            <figure className={ classes } key={this.props.title}>
                <div className="overlay"></div>
                <img className="cover" src={this.props.imageUrl}/>
                <figcaption className="info">
                    <div className="title">{this.props.title}</div>
                    <div className="issue-nr">#{this.props.issueNr}</div>
                    <div className="year">{this.props.year}</div>
                </figcaption>
            </figure>
        )
    }
});

var ComicsList = React.createClass({
    render: function() {
        return (
            <div className="comicsList">
                {this.props.comics.map(function(comic) {
                    return <Comic {...comic} key={comic.title}/>
                })}
            </div>
        )
    }
});

var comicsList = [
    {
        imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/c/00/57a0a42dce54f.jpg",
        title: "Tales of suspense featuring the power of iron man",
        issueNr: 132,
        year: 1948
    }
];

class Marvel extends Component {
    constructor(props) {
        super(props);
        this.state = {comics: comicsList};
    }

    onSearchChange(text) {
        console.log(text);
    }

    render() {
        return (
            <div className="marvel-app">
                <header>
                    <img className="logo" src="../assets/marvel_logo.png"/>
                    <SearchInput onSearchChange={this.onSearchChange}/>
                </header>
                <main>
                    <ComicsList comics={this.state.comics}/>
                </main>
                <footer>
                    <NavigationButtons/>
                </footer>
            </div>
        )
    }
}

render(<Marvel/>, document.getElementById("app"));

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

store.dispatch(tryGetComics("", 0)).then(() =>
    console.log(store.getState())
);
