import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Tabs from './Tabs.jsx';
import Panel from './Panel.jsx';

const App = () => {
  //constants
  const BASE_URL = "https://aircall-backend.onrender.com";
  const tabnames = ["Inbox", "Archived"]

  //state variables
  const [calldata, setCalldata] = useState(undefined);
  const [inbox, setInbox] = useState(tabnames[0]);

  //on app load, fetch initial calldata
  useEffect(() => {
    fetch(BASE_URL + "/activities")
    .then((response) => response.json())
    .then((data) => {
      setCalldata(data);
      console.log(data); //tbd
    })
    .catch((err) => {
      console.error(err.message);
    })
  }, []);

  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <Tabs inbox={inbox} setInbox={setInbox} tabnames={tabnames}/>
        <Panel calldata={calldata} inbox={inbox}/>
      </div>
      
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
