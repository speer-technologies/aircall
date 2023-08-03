import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const activitiesQuery = CreateApi({
	reducerPath: "activitiesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://cerulean-marlin-wig.cyclic.app/",
	}),
	endpoints: (builder) => ({
		getAllActivities: builder.query({
			query: () => `activities`,
		}),
	}),
});

export const { useGetAllActivitiesQuery } = activitiesQuery;
