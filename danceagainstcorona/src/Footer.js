import React from 'react';

import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<div className="left"></div>
			<div className="right">
				<div className="card">
					<h4>Support the dancers</h4>
					<p>We wish to connect dancers around the world.</p>
				</div>
				<div className="credits">
					Powered by
					<a href="https://www.heroku.com/"> Heroku</a>,
					<a href="https://www.netlify.com/"> Netlify</a>,
					<a href="https://airtable.com/"> Airtable</a> and
					<a href="https://reactjs.org/"> React.js</a>.
				</div>
			</div>
		</div>
	);
}

export default Footer;