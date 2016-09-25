import React, { PropTypes } from "react"
import { connect } from "react-redux"

import { previousPage, nextPage } from "../actions"

const NavigationButtons = ({ onPrevPageClick, onNextPageClick, firstPage = false }) => {
    const firstButtonStyle = firstPage? "hidden" : "";
    return (
        <div className="navigation-buttons">
            <div className={`previous button ${firstButtonStyle}`} onClick={onPrevPageClick}>Previous Page</div>
            <div className="next button" onClick={onNextPageClick}>Next page</div>
            <div className="clearfix"></div>
        </div>
    )
};

NavigationButtons.propTypes = {
    onPrevPageClick: PropTypes.func.isRequired,
    onNextPageClick: PropTypes.func.isRequired
};

const mapStateToProps = ({ page }) => {
    return {
        firstPage: page == 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPrevPageClick: () => {
            dispatch(previousPage())
        },
        onNextPageClick: () => {
            dispatch(nextPage())
        }
    }
};

const NavigationButtonsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationButtons);

export default NavigationButtonsContainer