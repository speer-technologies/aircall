import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// import { activitiesQuery } from "../features/activitiesQuery.js";

import activitiesSlice from "../features/activitiesSlice.js";

export const store = configureStore({
	reducer: {
		activities: activitiesSlice,
	},
});
