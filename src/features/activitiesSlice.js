import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activities: [
		{
			direction: "outbound",
			from: 100000,
			to: 200000,
			via: 30000000,
			duration: 0,
			call_type: "missed",
			is_archived: false,
			id: "6393bb5469073dc45849ca7a",
			created_at: "2022-12-09T22:48:52.789Z",
		},
	],
};

const activitiesSlice = createSlice({
	name: "activities",

	initialState,

	reducers: {},
});

export const {} = activitiesSlice.actions;

export default activitiesSlice.reducer;
