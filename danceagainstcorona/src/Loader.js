import React from 'react';

import './Loader.css';

function Loader() {
	return (
		<div className="loader">
			<p className="loader-text">Preparing your dance schedule for you... <span role="img" aria-label="hourglass emoji">&#x231b;</span></p>
		</div>
	);
}

export default Loader;