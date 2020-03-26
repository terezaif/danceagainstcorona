import React from 'react';

import './Loader.css';

function Loader(props) {
	return (
		<div className="loader">
			{props.isError ?
			<p className="loader-text">There is a problem. Our development team is working hard to fix it. Please come back later. <span role="img" aria-label="hourglass emoji">&#x231b;</span></p>:
			<p className="loader-text">Preparing your dance schedule in your timezone for you... <span role="img" aria-label="hourglass emoji">&#x231b;</span></p>}
		</div>
	);
}

export default Loader;