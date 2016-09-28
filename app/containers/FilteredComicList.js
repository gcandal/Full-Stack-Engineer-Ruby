import React, { PropTypes } from "react"
import { connect } from "react-redux"

import ComicList from "../components/ComicList"
import { saveMarkFavorite, saveUnmarkFavorite } from "../actions"

const mapStateToProps = ({ comics }) => {
    return {
        comics: comics
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onComicClick: (id, liked) => {
            if(liked) {
                dispatch(saveUnmarkFavorite(id));
            } else {
                dispatch(saveMarkFavorite(id));
            }
        }
    }
};

const FilteredComicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComicList);

export default FilteredComicList