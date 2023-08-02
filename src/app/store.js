import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { activitiesApi } from "../features/activitiesQuery";

import activitiesSlice from "../features/activitiesSlice";

export const store = configureStore({
	reducer: {
		[activitiesApi.reducerPath]: activitiesApi.reducer,
		activities: activitiesSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(activitiesApi.middleware),
});

setupListeners(store.dispatch);
