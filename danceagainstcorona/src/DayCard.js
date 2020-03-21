import React, { Component } from 'react';
import DanceClassCard from './DanceClassCard.js';

import './DayCard.css';

class DayCard extends Component {
	render() {
		const classData = this.props.classData;

		const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		const date = new Date(classData.date);
		const dayOfWeek = daysOfWeek[date.getDay()];

		return (
			<div className="daycard">
				<div className="day-widget">
					<h2>{dayOfWeek}</h2>
				</div>
				<div className="dance-class-cards">
					{classData.classes.map(danceClass => <DanceClassCard {...danceClass} /> )}
				</div>
			</div>
		);
	}
}

export default DayCard;

