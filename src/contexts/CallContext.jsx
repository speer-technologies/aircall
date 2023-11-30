import React, { createContext, useContext, useState } from "react";

const CallContext = createContext();

const CallProvider = ({ children }) => {
  const [tab, setTab] = useState("inbox");
  const [callData, setCallData] = useState(null);
  const [isChronological, setIsChronological] = useState(false);

  return (
    <CallContext.Provider
      value={{
        tab,
        setTab,
        callData,
        setCallData,
        isChronological,
        setIsChronological,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

const useCallContext = () => {
  return useContext(CallContext);
};

export { CallProvider, useCallContext };
