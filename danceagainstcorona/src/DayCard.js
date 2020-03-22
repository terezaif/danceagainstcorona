import React, { Component } from 'react';
import DanceClassCard from './DanceClassCard.js';

import './DayCard.css';

class DayCard extends Component {
	render() {

		const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		const date = new Date(this.props.date);
		const dayOfWeek = daysOfWeek[date.getDay()];

		return (
			<div className="daycard">
				<div className="day-widget">
					<h2 className="day-text">{dayOfWeek}</h2>
				</div>
				<div className="dance-class-cards">
					{this.props.classes.map(danceClass => <DanceClassCard {...danceClass} /> )}
				</div>
			</div>
		);
	}
}

export default DayCard;


