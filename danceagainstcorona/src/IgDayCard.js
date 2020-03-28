import React, { Component } from 'react';

import "./IgDayCard.css"

class IgDayCard extends Component {
	render() {
		const danceClass = this.props;
		const artists = danceClass.artists;

		const danceDateTime = new Date(danceClass.dateTime);
		const minutes = danceDateTime.getMinutes();

		// If the minutes are single digit, it doesn't have a pretrailing 0, so adding this here
		const minutePrefix = minutes > 10 ? '' : '0';
		const timeString = `${danceDateTime.getHours()}:${minutePrefix}${minutes}`;
		const igHandles = artists
			.map(artist => <a target="_blank" key={artist.instagram} rel="noopener noreferrer" href={"https://www.instagram.com/" + artist.instagram.substring(1) +"/"}>{artist.instagram}</a>)
			.reduce((prev, curr) => [prev, ', ', curr]);

		return (
			<div>
				<span className="ig-time-widget">
					<span className="ig-time-text">{timeString}</span>
				</span>
				<p className="ig-dance-style">{danceClass.danceStyle}&nbsp;</p>
				<p className="ig-more-info">with {igHandles}</p>
			</div>
		);
	}
}

export default IgDayCard;
