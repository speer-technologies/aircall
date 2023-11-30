import { cleanCalls } from "../utils/dataPreprocess";

const getCalls = () => {
  return new Promise((resolve, reject) => {
    try {
      fetch("https://cerulean-marlin-wig.cyclic.app/activities")
        .then((response) => response.json())
        .then((callData) => {
          resolve(cleanCalls(callData));
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default getCalls;
