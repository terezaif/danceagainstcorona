import React, { Component } from 'react';

import "./DanceClassCard.css"

class DanceClassCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;

		const happeningAt = new Date(danceClass.dateTime) //.toLocaleTimeString().slice(0,-3);
		const minutes = happeningAt.getMinutes();
		const minutePrefix = minutes > 10 ? '' : '0';
		const timeString = `${happeningAt.getHours()}:${minutePrefix}${minutes}`;
		const igHandles = artists.map(artist => artist.instagram).join(", ");

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
