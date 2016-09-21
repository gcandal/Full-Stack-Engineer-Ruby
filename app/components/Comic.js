import React, { PropTypes } from 'react'

const Comic = ({ title, imageUrl, issueNr, year, liked = false }) => (
    <figure className={ "comic" + (liked? " liked" : "") } key={title}>
        <div className="overlay"></div>
        <img className="cover" src={imageUrl}/>
        <figcaption className="info">
            <div className="title">{title}</div>
            <div className="issue-nr">#{issueNr}</div>
            <div className="year">{year}</div>
        </figcaption>
    </figure>
);

Comic.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    issueNr: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
};

export default Comic