export const cleanCalls = (data) => {
  // filter all the invalid data
  return data.filter(
    (call) =>
      "id" in call &&
      "created_at" in call &&
      "direction" in call &&
      "from" in call &&
      "to" in call &&
      "via" in call &&
      "duration" in call &&
      "is_archived" in call &&
      "call_type" in call
  );
};

export const stackCalls = (data, filter = "") => {
  if (!data) return [];

  let stacked = [];
  let processed = [];
  let isArhivedRequired = filter === "archived";

  // stack the same consecutive calls, added "repeat" and "nextCalls" key to a call
  data.forEach((call) => {
    const newCall = { ...call, repeat: 1, nextCalls: [] };

    if (stacked.length === 0) {
      stacked.push(newCall);
    } else {
      let previousData = stacked[stacked.length - 1];
      if (
        newCall.from === previousData.from &&
        newCall.to === previousData.to &&
        newCall.direction === previousData.direction &&
        newCall.is_archived === previousData.is_archived
      ) {
        previousData.repeat++;
        previousData.nextCalls.push(newCall);
      } else {
        stacked.push(newCall);
      }
    }
  });

  // early return if no filter is "", i.e. Tab "All" is selected
  if (filter === "") return stacked;

  // filtered by is_archive === isArhivedRequired
  stacked.forEach((call) => {
    if (call.nextCalls.length > 0) {
      call.nextCalls = call.nextCalls.filter(
        (nextCall) => nextCall.is_archived === isArhivedRequired
      );
    }

    if (call.is_archived === isArhivedRequired) {
      processed.push(call);
    } else {
      if (call.nextCalls.length > 0) {
        let newCall = call.nextCalls[0];

        newCall.repeat = call.repeat - 1;
        newCall.nextCalls = call.nextCalls.slice(1);

        processed.push(newCall);
      }
    }
  });

  return processed;
};
