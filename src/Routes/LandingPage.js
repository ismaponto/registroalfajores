import '../App.css';

import React from 'react';
import NavigationBar from '../Components/NavigationBar.js';
import Footer from '../Components/Footer.js';

function LandingPage() {
	return (
		<div className="App font-manrope overflow-hidden">
			<NavigationBar />
			<Footer />
		</div>
	);
}

export default LandingPage;
