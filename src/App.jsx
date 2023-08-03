import React from "react";

import Header from "./components/Header/index.jsx";
import ContextWrapper from "./ContextWrapper.jsx";
import Body from "./components/Body/index.jsx";

function App() {
	return (
		<ContextWrapper>
			<div className='container'>
				<Header />

				<Body />
				<div className='container-view'>Some activities should be here</div>
			</div>
		</ContextWrapper>
	);
}

export default App;
