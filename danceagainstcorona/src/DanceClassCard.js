import React, { Component } from 'react';

import "./DanceClassCard.css"

class DanceClassCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;

		const timeString = new Date(danceClass.dateTime).toLocaleTimeString().slice(0,-3);
		const igHandles = artists.map(artist => artist.instagram).join(", ");

		return (
			<div className="dance-class-card">
				<div className="time-widget">
					<div className="time-text">{timeString}</div>
				</div>
				{danceClass.danceStyle} with {igHandles}
			</div>
		);
	}
}

export default DanceClassCard;


