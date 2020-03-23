import React, { Component } from 'react';

import "./DanceClassCard.css"

class DanceClassCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;

		const happeningAt = new Date(danceClass.dateTime);
		const minutes = happeningAt.getMinutes();

		// If the minutes are single digit, it doesn't have a pretrailing 0, so adding this here
		const minutePrefix = minutes > 10 ? '' : '0';
		const timeString = `${happeningAt.getHours()}:${minutePrefix}${minutes}`;
		const igHandles = artists
			.map(artist => <a target="_blank" key={artist.name} rel="noopener noreferrer" href={"https://www.instagram.com/" + artist.instagram.substring(1) +"/"}>{artist.instagram}</a>)
			.reduce((prev, curr) => [prev, ', ', curr]);

		return (
			<div className="dance-class-card">
				<div className="time-widget">
					<div className="time-text">{timeString}</div>
				</div>
				<div className="description">
					<div className="dance-style">{danceClass.danceStyle}</div>
					<div>with {igHandles}</div>
					<div>in {danceClass.language}</div>
					<div>for {danceClass.duration}</div>
				</div>
			</div>
		);
	}
}

export default DanceClassCard;
