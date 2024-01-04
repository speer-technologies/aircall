import React from 'react';
import { useEffect, useState } from "react";
import './css/common.css'
const baseURL = 'https://cerulean-marlin-wig.cyclic.app/activities'


const SpecificCallDetails = ({ callId }) => {

    const [callDetails, setCallDetails] = useState([]);
    const getCallDetails = async () => {
        await fetch(`${baseURL}/${callId}`).then((res) => res.json())
            .then((json) => {
                console.log(json)
                setCallDetails({ ...json })
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCallDetails()
    }, [])

    return <div className='special_details_card'>
       
        <p>Via : {callDetails.via}</p>
        <p>Duration : {callDetails.duration}</p>
        <p>call_type : {callDetails.call_type}</p>
        <p>direction : {callDetails.direction}</p>
        <p>created_at : {callDetails.created_at}</p>
      

    </div>

}

export default SpecificCallDetails;