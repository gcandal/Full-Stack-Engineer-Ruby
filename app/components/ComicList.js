import React, { PropTypes } from "react"

import Comic from "./Comic"

const ComicsList = ({ comics = [], onComicClick }) => (
    <div className="comicsList">
        {comics.map(function(comic) {
            return <Comic {...comic} onClick={() => onComicClick(comic.id)} key={comic.id}/>
        })}
    </div>
);

ComicsList.propTypes = {
    comics: PropTypes.array.isRequired,
    onComicClick: PropTypes.func.isRequired
};

export default ComicsList