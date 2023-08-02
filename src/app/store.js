import { configureStore } from "@reduxjs/toolkit";

import activitiesSlice from "../features/activitiesSlice.js";

export const store = configureStore({
	reducer: {
		activities: activitiesSlice,
	},
});
