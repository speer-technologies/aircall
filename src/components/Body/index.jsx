import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useGetAllActivitiesQuery } from "../../features/activitiesApi.js";

function Body() {
	const activities = useSelector((state) => state.activities);

	// const { data, error, isLoading } = useGetAllActivitiesQuery();

	// console.log(data);

	// const { data } = useGetAllActivites();

	const { data, isLoading } = useGetAllActivitiesQuery();

	console.log(data);

	console.log(activities.activities);

	return (
		<div>
			Body
			<h2>Activities</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div>
					{data.map((activity) => (
						<div key={activity.id}>
							<div>
								Direction:
								{activity.direction}
							</div>
							<div>
								From:
								{activity.from}
							</div>
							<div>
								To:
								{activity.to}
							</div>
						</div>
					))}
				</div>
			)}
			{/* {activities.activities.map((activity) => (
				<div key={activity.id}>
					<div>
						Direction:
						{activity.direction}
					</div>
					<div>
						From:
						{activity.from}
					</div>
					<div>
						To:
						{activity.to}
					</div>
				</div>
			))} */}
		</div>
	);
}

export default Body;
