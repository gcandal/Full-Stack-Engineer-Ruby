import React, { Component, PropTypes } from "react"

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
        this.props.onSearch(this.state.text);
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
    onSearch: PropTypes.func
};

export default SearchInput