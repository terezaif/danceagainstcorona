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
					<p>This website was inspired by <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ladylis_dhclasshh/">@ladylis_dhclasshh</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/gigiwowwow/">@gigiwowwow</a> with their creation of <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/danceagainstcorona/">@danceagainstcorona</a>.</p>
					<p>It is powered by&nbsp;
					<a target="_blank" rel="noopener noreferrer" href="https://airtable.com/">Airtable</a>,&nbsp;
					<a target="_blank" rel="noopener noreferrer" href="https://www.heroku.com/">Heroku</a>,&nbsp;
					<a target="_blank" rel="noopener noreferrer" href="https://www.netlify.com/">Netlify</a>,&nbsp;
					<a target="_blank" rel="noopener noreferrer" href="https://www.python.org/">Python</a> and&nbsp;
					<a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React.js</a>.</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;