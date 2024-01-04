import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './Header.jsx';
import AllCalls from './AllCalls.jsx';
import Footer from './Footer.jsx';
import ArchivedCalls from './ArchivedCalls.jsx';

const baseURL = 'https://cerulean-marlin-wig.cyclic.app'


const App = () => {


  const [screen, setScreen] = useState('allCalls')
  const [activities, setActivities] = useState([]);
  const [callId, setCallId] = useState(-1)

  const handleScreens = (value) => {
    setScreen(value)
  }

  const getAllActivities = async () => {
    await fetch(`${baseURL}/activities`).then((res) => res.json())
      .then((json) => {
        console.log(json)
        setActivities([...json])
      }).catch((err) => {
        console.log(err)
      })
  }

  const archiveAndUnArchiveTheCall = async (id, value) => {
    await axios.patch(`${baseURL}/activities/${id}`, {
      is_archived: value
    }).then((res) => res)
      .then((json) => {
        console.log(json)
        if (json.status == 200) {
          getAllActivities()
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const reset = async () => {
    await axios.patch(`${baseURL}/reset`).then((res) => {
      if (res.status == 200) {
        getAllActivities()
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const archiveAll = async () => {
    console.log("archiveAll")

  }


  useEffect(() => {
    getAllActivities()
  }, [])

  return (
    <div className='container'>
      <Header />
      <div style={{ height: '80%' }}>
        {screen == 'allCalls' ?
          <AllCalls activities={activities} archiveAndUnArchiveTheCall={archiveAndUnArchiveTheCall} archiveAll={archiveAll} /> :
          <ArchivedCalls activities={activities} archiveAndUnArchiveTheCall={archiveAndUnArchiveTheCall} reset={reset} />
        }
      </div>
      <Footer handleScreens={handleScreens} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
