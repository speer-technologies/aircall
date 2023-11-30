import React from "react";
import ReactDOM from "react-dom";

import ActivityFeed from "./components/ActivityFeed/index.jsx";
import Header from "./Header.jsx";
import FeedTabs from "./components/FeedTabs/index.jsx";
import NavBar from "./components/NavBar/index.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import { CallProvider } from "./contexts/CallContext.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <CallProvider>
        <FeedTabs />
        <main className="container-view scrollable-content">
          <ActivityFeed />
        </main>
        <NavBar />
      </CallProvider>
    </div>
  );
};

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("app")
);

export default App;
