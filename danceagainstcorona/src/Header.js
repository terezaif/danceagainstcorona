import React from 'react';
import LisLogo from './lisalone.svg';

import './Header.css';

function Header() {
	return (
		<div className="header">
			{[...Array(200)].map((e, i) => <img src={LisLogo} alt="LisLogo"/>)}
			<a href="https://www.instagram.com/danceagainstcorona/">
				<div class="textwrap">
					<h1>dance</h1>
					<h1>against</h1>
					<h1>corona</h1>
				</div>
			</a>
		</div>
	);
}

export default Header;