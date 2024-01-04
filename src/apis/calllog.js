// userApi.js
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";

export const getCallLogs = () => {
  return fetch(`${BASE_URL}/activities`).then((response) => response.json());
};

// Retrieve a specific call details
export const getCallDetails = (callId) => {
  return fetch(`${BASE_URL}/activities/${callId}`).then((response) =>
    response.json()
  );
};

// Update a call (only is_archived field is updatable)
export const updateCall = (callId, isArchived) => {
  return fetch(`${BASE_URL}/activities/${callId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_archived: isArchived }),
  }).then((response) => response.json());
};

// Reset all calls to initial state
export const resetCalls = () => {
  return fetch(`${BASE_URL}/reset`, {
    method: "PATCH",
  }).then((response) => response.json());
};
