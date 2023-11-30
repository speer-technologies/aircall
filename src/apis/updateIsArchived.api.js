const updateIsArchived = (callId, is_archived) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ is_archived: !is_archived }),
      }).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default updateIsArchived;
