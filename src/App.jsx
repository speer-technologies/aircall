import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import ActivityDetails from './components/ActivityDetails.jsx'
import ActivityFeed from './components/ActivityFeed.jsx'

import "./css/app.css";

const App = () => {
  return (
    <Router>
      <div className='container'>
      {/* <ActivityDetails/> */}
        <Routes>
          <Route path="/*" element={<ActivityFeed />} />
          <Route path="/details/:id" element={<ActivityDetails />} />
        </Routes>
      </div>

    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
