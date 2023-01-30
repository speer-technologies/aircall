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
      .get(
        'https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities'
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(`The Error is: ${error}`);
      });
  }, []);

  return <div></div>;
};

export default CallList;
