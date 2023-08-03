import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { activitiesApi } from "../features/activitiesApi.js";
import activitiesSlice from "../features/activitiesSlice.js";

console.log(activitiesApi.reducerPath);

export const store = configureStore({
	reducer: {
		activities: activitiesSlice,

		[activitiesApi.reducerPath]: activitiesApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(activitiesApi.middleware),
});

setupListeners(store.dispatch);
