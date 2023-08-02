import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import Header from "./Header.jsx";

const App = () => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<div className='container'>
					<Header />
					<div className='container-view'>Some activities should be here</div>
				</div>
			</Provider>
		</React.StrictMode>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
