import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Body() {
	const activities = useSelector((state) => state.activities);

	console.log(activities.activities);

	return (
		<div>
			Body
			<h2>Activities</h2>
			{activities.activities.map((activity) => (
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
	);
}

export default Body;
