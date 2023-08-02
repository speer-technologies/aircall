import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import ContextWrapper from "./ContextWrapper";

const App = () => {
	return (
		<React.StrictMode>
			<ContextWrapper>
				<div className='container'>
					<Header />
					<div className='container-view'>Some activities should be here</div>
				</div>
			</ContextWrapper>
		</React.StrictMode>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
