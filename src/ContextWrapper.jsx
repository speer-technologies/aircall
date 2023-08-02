import React from "react";
import { Provider } from "react-redux";

import { store } from "./app/store";

function ContextWrapper({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

export default ContextWrapper;
