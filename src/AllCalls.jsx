import React from 'react';
import { useState, useEffect } from "react";
import './css/common.css'
import SpecificCallDetails from './SpecificCallDetails';
import { Archive, CallMissed, Voicemail, Call, ArrowRightAlt } from '@mui/icons-material'
import { red, blue } from '@mui/material/colors';

const AllCalls = ({ activities, archiveAndUnArchiveTheCall, archiveAll }) => {

    const [callId, setCallId] = useState(-1)
    const [unArchivedCalls, setUnArchivedCalls] = useState([])
    const [isArchivingAll, setIsArchivingAAll] = useState(false)


    const handleArchive = async (id) => { archiveAndUnArchiveTheCall(id, true) }

    const handleCallId = (id) => {
        if (callId == -1) {
            setCallId(id)
        } else {
            setCallId(-1)
        }
    }

    useEffect(() => {
        let calls = activities?.filter((activity) => activity.is_archived == false && activity.call_type != undefined && activity.from != undefined)
        console.log('calls', calls)
        setUnArchivedCalls([...calls])
        setIsArchivingAAll(false)
    }, [activities])


    return <div className='screen_card'>
        <div className='all_call_top'>
            <button disabled={unArchivedCalls.length == 0} onClick={() => {
                setIsArchivingAAll(true)
                archiveAll()
            }} className='archive_all_button'>
                <div style={{ fontSize: "12px", color: "gray" }}>Archive All</div>
            </button>
        </div>

        {
            isArchivingAll ? <div className='no_activities'>
                <h1 style={{color:"green"}}>Archiving All Calls ....!</h1>
            </div> :
             unArchivedCalls?.map((activity) => {
                return <div key={activity.id} className='call_card'>
                    <div className='call_card_flex'>
                        <div className='icons'>
                            {activity.call_type == "missed" && <div className='center_flex_column'>
                                <CallMissed sx={{ color: red[500] }} />
                                <div className='voice_type_text'>Missed</div>
                            </div>}
                            {activity.call_type == "answered" && <div className='center_flex_column'>
                                <Call color="success" />
                                <div className='voice_type_text'>Answered</div>
                            </div>}
                            {activity.call_type == "voicemail" && <div className='center_flex_column'>
                                <Voicemail color="secondary" />
                                <div className='voice_type_text'>VoiceMail</div>
                            </div>}
                        </div>

                        <div onClick={() => { handleCallId(activity.id) }} className='call_info_outter'>

                            <div className='call_info_from_to'>
                                <div >{activity?.from}</div>
                                <div style={{ fontSize: 6 }}>From</div>
                            </div>

                            <div className='call_info_mid'>
                                <ArrowRightAlt fontSize='large' />
                                <div style={{ fontSize: 7 }}>Click for more info</div>
                            </div>

                            <div className='call_info_from_to'>
                                <div>{activity?.to}</div>
                                <div style={{ fontSize: 6 }}>To</div>
                            </div>

                        </div>

                        <div className='icons' onClick={() => { handleArchive(activity.id) }} >
                            <Archive sx={{ color: blue[500] }} />
                        </div>

                    </div>
                    {
                        callId == activity.id && <div style={{ marginTop: 5 }}> <SpecificCallDetails callId={callId} /> </div>
                    }

                </div>

            })
        }

        {
            unArchivedCalls.length == 0 && <div className='no_activities'>
                <h1>NO CALLS PRESENT</h1>
            </div>
        }

    </div>
}

export default AllCalls;