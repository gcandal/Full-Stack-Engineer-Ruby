import React, { PropTypes } from "react"
import { connect } from "react-redux"

import ComicList from "../components/ComicList"

const mapStateToProps = ({ comics }) => {
    return {
        comics: comics
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onComicClick: (id) => {

        }
    }
};

const FilteredComicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComicList);

export default FilteredComicList