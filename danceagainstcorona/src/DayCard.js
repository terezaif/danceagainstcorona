import React, { Component } from 'react';
import IgDayCard from './IgDayCard.js';
import DanceClassCard from './DanceClassCard.js';

import './DayCard.css';

class DayCard extends Component {
	constructor(props){
		super(props);

		this.daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		this.date = new Date(this.props.date);
		this.dayOfWeek = this.daysOfWeek[this.date.getDay()];

		this.igDayCardID = `ig-day-card-${this.dayOfWeek}`;

		this.windowWidth = window.innerWidth;
	}

	render() {
		return (
			<div className="daycard">
				<div className="day-widget">
					<h2 className="day-text">{ this.dayOfWeek }</h2>
				</div>
				{ window.innerWidth > 375
					? <div className="dance-class-cards">
						{this.props.classes.map(danceClass => <DanceClassCard key={danceClass.id} {...danceClass} /> )}
					</div>
					: <div className="ig-day-card" id={this.igDayCardID}>
						<h3 className="ig-day-of-week">{ this.dayOfWeek }</h3>
						{this.props.classes.map(danceClass => <IgDayCard key={danceClass.id} {...danceClass} /> )}
					</div>
				}
			</div>
		);
	}
}

export default DayCard;


