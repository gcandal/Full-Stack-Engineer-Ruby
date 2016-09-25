import React, { Component } from "react"
import { connect } from "react-redux"

import FilteredComicList from "./FilteredComicList"
import NavigationButtonsContainer from "./NavigationButtons"
import SearchInputContainer from "../containers/SearchInput"
import { tryGetComics, forceGetComics } from "../actions"

class Marvel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.store.dispatch(tryGetComics("", 0));
    }

    componentWillReceiveProps({ page, searchText}) {
        if (page !== this.props.page || searchText !== this.props.searchText) {
            this.props.store.dispatch(forceGetComics(searchText, page));
        }
    }

    render() {
        return (
            <div className="marvel-app">
                <header>
                    <img className="logo" src="../assets/marvel_logo.png"/>
                    <SearchInputContainer store={this.props.store} />
                </header>
                <main>
                    <FilteredComicList store={this.props.store} />
                </main>
                <footer>
                    <NavigationButtonsContainer store={this.props.store} />
                </footer>
            </div>
        )
    }
}

Marvel.defaultProps = {
    comics: [],
    page: 0
};

const mapStateToProps = ({ comics, searchText, page}) => {
    return {
        comics: comics,
        searchText: searchText,
        page: page
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (text) => {
            dispatch(getComics(text, ownProps.page))
        }
    }
};

const MarvelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Marvel);

export default MarvelContainer