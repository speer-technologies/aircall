import {
  PhoneIncoming,
  PhoneOutgoing,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Activities({ archivedActivities }) {
  const [activities, setActivities] = useState([]);
  const [expandedActivityId, setExpandedActivityId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  useEffect(() => {
    // fetch all of the calls when page mounts
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "https://aircall-backend.onrender.com/activities"
        );
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [updateArchive]);

  const updateArchive = async ({ id, archived }) => {
    setIsLoading(true);
    try {
      await fetch(`https://aircall-backend.onrender.com/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: !archived,
        }),
      });
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === id
            ? { ...activity, is_archived: !archived }
            : activity
        )
      );
      toast.success("Call Archived");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating call:", error);
    }
  };

  const archiveAll = async () => {
    setIsBulkLoading(true);
    try {
      const promises = activities.map((activity) =>
        fetch(
          `https://aircall-backend.onrender.com/activities/${activity.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              is_archived: true,
            }),
          }
        )
      );
      await Promise.all(promises);
      setActivities((prevActivities) =>
        prevActivities.map((activity) => ({
          ...activity,
          is_archived: true,
        }))
      );
      toast.success("All calls archived");
    } catch (error) {
      console.error("Error archiving calls:", error);
    } finally {
      setIsBulkLoading(false);
    }
  };

  const unarchiveAll = async () => {
    setIsBulkLoading(true);
    try {
      await fetch("https://aircall-backend.onrender.com/reset", {
        method: "PATCH",
      });
      setActivities((prevActivities) =>
        prevActivities.map((activity) => ({
          ...activity,
          is_archived: false,
        }))
      );
      toast.success("All calls unarchived");
    } catch (error) {
      console.error("Error unarchiving calls:", error);
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleArchiveToggle = () => {
    if (archivedActivities) {
      unarchiveAll();
    } else {
      archiveAll();
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatDate = (time) => {
    const date = new Date(time);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const toggleExpand = (id) => {
    setExpandedActivityId(expandedActivityId === id ? null : id);
  };

  return (
    <div className="h-full mb-10">
      <button
        className="px-5 mt-2 flex justify-center items-center h-8 text-white font-semibold rounded bg-black disabled:bg-gray-500 hover:bg-gray-900 transition-colors duration-200"
        onClick={handleArchiveToggle}
        disabled={isBulkLoading}
      >
        {isBulkLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : archivedActivities ? (
          "Unarchive All"
        ) : (
          "Archive All"
        )}
      </button>
      {activities.length > 0 ? (
        <div className="flex flex-col gap-1 h-full mb-10">
          {activities
            .filter((activity) => activity.is_archived === archivedActivities)
            .map((activity, index) => {
              const activityDate = formatDate(activity.created_at);
              const previousActivityDate =
                index > 0 ? formatDate(activities[index - 1].created_at) : null;
              const isExpanded = expandedActivityId === activity.id;
              return (
                <div key={activity.id}>
                  {activityDate !== previousActivityDate && (
                    <div className="flex items-center my-4">
                      <hr className="flex-grow border-gray-300" />
                      <span className="mx-4 text-gray-500 font-semibold">
                        {activityDate}
                      </span>
                      <hr className="flex-grow border-gray-300" />
                    </div>
                  )}

                  <div className="flex mb-3 flex-col border w-full rounded-lg shadow-sm p-4 hover:bg-gray-100 duration-200 transition-colors">
                    <button
                      className="flex items-center w-full "
                      onClick={() => toggleExpand(activity.id)}
                    >
                      <div className="flex w-[75%]">
                        {activity.direction === "inbound" ? (
                          <div className="font-semibold flex">
                            <PhoneIncoming
                              color={`${
                                activity.call_type === "answered"
                                  ? "green"
                                  : "red"
                              }`}
                              size={16}
                              className="mr-4"
                            />
                            <div className="">{activity.from}</div>
                          </div>
                        ) : (
                          <div className="font-semibold flex">
                            <PhoneOutgoing
                              size={16}
                              color={`${
                                activity.call_type === "answered"
                                  ? "green"
                                  : "red"
                              }`}
                              className="mr-4"
                            />
                            <div className="">{activity.from}</div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mr-1">
                        {formatTime(activity.created_at)}
                      </div>
                      <div>
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </button>
                    <div
                      className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                        isExpanded ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="flex flex-col py-2 items-start justify-start text-gray-600">
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {activity.call_type}
                        </p>
                        <p>
                          <span className="font-semibold">From:</span>{" "}
                          {activity.from}
                        </p>
                        <p>
                          <span className="font-semibold">To:</span>{" "}
                          {activity.to}
                        </p>
                        <p>
                          <span className="font-semibold">Via:</span>{" "}
                          {activity.via}
                        </p>
                        <p>
                          <span className="font-semibold">Duration:</span>{" "}
                          {activity.duration} seconds
                        </p>

                        <button
                          className="w-full mt-2 flex justify-center items-center h-8 text-white font-semibold rounded bg-black disabled:bg-gray-500 hover:bg-gray-900 transition-colors duration-200"
                          onClick={() =>
                            updateArchive({
                              id: activity.id,
                              archived: activity.is_archived,
                            })
                          }
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 size={16} className="animate-spin mr-3" />
                          )}
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full w-full mt-4">
          {" "}
          <Loader2 size={16} className="animate-spin mr-3" />
        </div>
      )}
    </div>
  );
}
