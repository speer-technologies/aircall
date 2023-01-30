//External Modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//Internal Modules
import CallListItem from './CallListItem';

const CallList = () => {
  const [calls, setCalls] = useState([]);

  // Fetch all calls
  useEffect(() => {
    axios
      .get('https://cerulean-marlin-wig.cyclic.app/activities')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(`The Error is: ${error}`);
      });
  }, []);
  return <div>test</div>;
};

export default CallList;
