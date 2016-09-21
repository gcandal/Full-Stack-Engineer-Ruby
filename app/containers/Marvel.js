import React, { Component } from "react"
import { connect } from "react-redux"

import ComicList from "../components/ComicList"
import NavigationButtons from "../components/NavigationButtons"
import SearchInput from "../containers/SearchInput"

class Marvel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="marvel-app">
                <header>
                    <img className="logo" src="../assets/marvel_logo.png"/>
                    <SearchInput onSearch={this.onSearch}/>
                </header>
                <main>
                    <ComicList comics={this.props.comics}/>
                </main>
                <footer>
                    <NavigationButtons/>
                </footer>
            </div>
        )
    }
}

Marvel.defaultProps = {
    comics: [],
    page: 0
};

const mapStateToProps = (state) => {
    return {comics: state.comics}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (text) => {
            dispatch(tryGetComics(text, ownProps.page))
        }
    }
};

const MarvelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Marvel);

export default MarvelContainer