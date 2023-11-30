const resetAllIsArchived = () => {
  return new Promise((resolve, reject) => {
    try {
      fetch("https://cerulean-marlin-wig.cyclic.app/reset", {
        method: "PATCH",
      }).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default resetAllIsArchived;
