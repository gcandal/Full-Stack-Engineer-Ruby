import React, { PropTypes } from "react"

import Comic from "./Comic"

const ComicsList = ({ comics = [] }) => (
    <div className="comicsList">
        {comics.map(function(comic) {
            return <Comic {...comic} key={comic.title}/>
        })}
    </div>
);

ComicsList.propTypes = {
    comics: PropTypes.array.isRequired
};

export default ComicsList