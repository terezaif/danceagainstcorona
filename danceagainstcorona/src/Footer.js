import React from 'react';

import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<div className="left"></div>
			<div className="right">
				<div className="card">
					<h4>Support the dancers</h4>
					<p>When you take a class online, we encourage you to support the dancers. <span role="img" aria-label="flexed biceps emoji">&#x1F4AA;</span> Thank you for your help in sustaining a diverse dance scene during the turbulent times.</p>
				</div>
				<div className="credits">
					Powered by&nbsp;
					<a href="https://airtable.com/">Airtable</a>,&nbsp;
					<a href="https://www.heroku.com/">Heroku</a>,&nbsp;
					<a href="https://www.netlify.com/">Netlify</a>,&nbsp;
					<a href="https://www.python.org/">Python</a> and&nbsp;
					<a href="https://reactjs.org/">React.js</a>.
				</div>
			</div>
		</div>
	);
}

export default Footer;