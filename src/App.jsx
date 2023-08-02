import React from "react";

import Header from "./Header.jsx";
import ContextWrapper from "./ContextWrapper.jsx";

function App() {
	return (
		<ContextWrapper>
			<div className='container'>
				<Header />
				<div className='container-view'>Some activities should be here</div>
			</div>
		</ContextWrapper>
	);
}

export default App;
