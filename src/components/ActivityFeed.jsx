import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Header from '../Header.jsx'

import '../css/activityFeed.css'

import incoming from '../assets/icons/incomming-call.png'
import outgoing from '../assets/icons/outgoing-call.png'
import clock from '../assets/icons/clock.png'

const ActivityFeed = () => {
  const { pathname } = useLocation()
  const isArchivePage = pathname === '/archive' || false
  console.log({ location });
  const [feeds, setFeeds] = useState([])
  useEffect(() => {
    fetch(' https://aircall-job.herokuapp.com/activities').then(response => response.json())
      .then(data => { setFeeds(data) });
  }, [])
  return (<Fragment>
    <Header />
    {!isArchivePage &&
      <Link to="/archive">
        <div className="archiveSection" >
          Archived Feeds
        </div>
      </Link>}

    {feeds.map(feed => {
      if (isArchivePage) {
        return feed.is_archived && List(feed)
      }
      else
        return !feed.is_archived &&
          List(feed)
    }
    )
    }
  </Fragment >)
}


const List = (feed) => <Link to={`/details/${ feed.id }`} key={feed.id} style={{ textDecoration: 'none', color: "inherit" }}>
  <div className='feedRow'>
    <div className='icon'>
      {feed.direction === 'outbound' ? <img src={outgoing} width="15px" alt='outgoing call' /> : <img src={incoming} width="15px" alt='incoming call' />}
    </div>

    <div className='recipientContainer'>
      <span className='recipient' style={feed.call_type === 'missed' ? { color: 'red' } : feed.call_type === 'voicemail' ? { color: '#4962f5' } : {}} >{feed.direction === 'outbound' ? feed.to : feed.from}
      </span>
      <span className="date">{feed.created_at.split('T')[0]}</span>
      <span className="time">{feed.created_at.split('T')[1].split('.')[0]}</span>
    </div>

    <div className='duration'>
      <img src={clock} width="10px" alt='clock' /> <span>{feed.duration} sec</span>
    </div>
  </div>
</Link>
export default ActivityFeed
