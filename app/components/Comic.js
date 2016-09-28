import React, { PropTypes } from 'react'

const Comic = ({ id, title, imageUrl, issueNr, year, liked = false, onClick }) => (
    <figure className={ "comic" + (liked? " liked" : "") } onClick={onClick}>
        <div className="overlay">
            <div className="hearth"></div>
        </div>
        <img className="cover" src={imageUrl}/>
        <figcaption className="info">
            <div className="title">{title}</div>
            <div className="issue-nr">#{issueNr}</div>
            <div className="year">{year}</div>
        </figcaption>
    </figure>
);

Comic.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    issueNr: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Comic