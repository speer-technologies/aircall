import { useState } from "react";
import './css/common.css'
import SpecificCallDetails from './SpecificCallDetails';
import { red } from '@mui/material/colors';
import { Unarchive, CallMissed, Voicemail, Call, ArrowRightAlt} from '@mui/icons-material'


const ArchivedCalls = ({ activities, archiveAndUnArchiveTheCall, reset }) => {

    const [callId, setCallId] = useState(-1)

    const handleUnArchive = async (id) => { archiveAndUnArchiveTheCall(id, false) }

    const handleCallId = (id) =>{
        if (callId == -1) {
            setCallId(id)
        } else {
            setCallId(-1)
        }
    }

    return <div className='screen_card'>
        <div className='archived_call_top'>
           
            <div className='archived_call_text'>
                Archived Calls
            </div>

            <div onClick={reset} className='reset_outter'>
                <Unarchive fontSize='large' sx={{ color: red[500] }} />
                <div style={{ fontSize: "10px", color: "gray" }}>RESET</div>
                <div className='voice_type_text'>Archived Calls</div>
            </div>
        </div>


        {
            activities?.filter((activity) => activity.is_archived == true && activity.call_type != undefined)?.map((activity) => {
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
                                <div >{activity.from}</div>
                                <div style={{ fontSize: 6 }}>From</div>
                            </div>

                            <div className='call_info_mid'>
                                <ArrowRightAlt fontSize='large' />
                                <div style={{ fontSize: 6 }}>Click for more info</div>
                            </div>

                            <div className='call_info_from_to'>
                                <div>{activity.to}</div>
                                <div style={{ fontSize: 6 }}>To</div>
                            </div>

                        </div>

                        <div className='icons' onClick={() => { handleUnArchive(activity.id) }}>
                            <Unarchive sx={{ color: red[500] }} />
                        </div>

                    </div>
                    {
                        callId == activity.id && <div style={{ marginTop: 5 }}> <SpecificCallDetails callId={callId} /> </div>
                    }

                </div>

            })
        }


    </div>
}

export default ArchivedCalls;