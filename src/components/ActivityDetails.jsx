import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../Header.jsx'

import '../css/ActivityDetails.css'

//  https://aircall-job.herokuapp.com/activities/:id
const ActivityDetails = () => {

  const [details, setDetails] = useState([])
  const params = useParams();

  useEffect(() => {
    fetch(`https://aircall-job.herokuapp.com/activities/${ params.id || 7833 }`).then(response => response.json())
      .then(data => { setDetails(data) });
  }, [])

  return (<Fragment>
    <Header />
    <div className="detailsContainer">

    {Object.keys(details).map(prop => <div key={prop} className="detailBox">
      <span className="fieldName">
        {prop}: &nbsp;
        </span>
        
      <span className="fieldValue">
        {details[prop]}
        </span>
    </div>)}
    </div>
  </Fragment>)
}
export default ActivityDetails
