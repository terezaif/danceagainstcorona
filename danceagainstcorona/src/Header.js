import React from 'react';

import './Header.css';

function Header() {
	return (
		<div className="header">
			<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/danceagainstcorona/">
				<div className="titlewrap">
					<h1>dance</h1>
					<h1>against</h1>
					<h1>corona</h1>
				</div>
			</a>
			<a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfevcB0XJKDgoeTaot3uNQHx8Go30N_mb9VqGeYbwl945tN2g/viewform">
				<div className="formwrap">
					<p>Want your class to be featured? Click here and let us know more!</p>
				</div>
			</a>
		</div>
	);
}

export default Header;