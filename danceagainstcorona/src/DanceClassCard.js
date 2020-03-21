import React, { Component } from 'react';

class DanceClassCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;
		const igHandles = artists.map(artist => artist.instagram).join(", ");
		return (
			<div>
				{danceClass.dateTime}: {danceClass.danceStyle} with {igHandles}
			</div>
		);
	}
}

export default DanceClassCard;


