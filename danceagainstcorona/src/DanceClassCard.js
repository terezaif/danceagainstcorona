import React, { Component } from 'react';

class DanceClassCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;

		const timeString = new Date(danceClass.dateTime).toLocaleTimeString().slice(0,-3);
		const igHandles = artists.map(artist => artist.instagram).join(", ");

		return (
			<div>
				{timeString}: {danceClass.danceStyle} with {igHandles}
			</div>
		);
	}
}

export default DanceClassCard;


