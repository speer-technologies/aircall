import React, { useState } from 'react';

const Call = ({item}) => {
    const options = {month: "short", day: "numeric", hour: "numeric", minute: "numeric"}
    const datestring = new Date(item.created_at).toLocaleString([],options);
    const directionsrc = './public/' + item.direction + '.png'
    let typesrc = './public/' + item.call_type;
    if (item.call_type == "missed_call") {
        typesrc += ".gif";
    } else {
        typesrc += ".png";
    }

    const [expanded, setExpanded] = useState(false);
 
    function toggleExpand() {
        setExpanded(!expanded);
    };

    return (
        <div className="call"
        onClick={() => toggleExpand()}>
            <div className="basedisplay">
                <img className="direction icon" src={directionsrc}/>
                <div className="whoandwhen">
                    <div className="otherparty">
                        {item.direction == "inbound" ? ("From " + item.from) : ("To " + item.to)}
                    </div>
                    <div className="time">{datestring}</div>
                </div>
                <img className="calltype icon" src={typesrc}
                />
            </div>
            <div className={expanded ? "expandeddisplay" : "expandeddisplay hidden" }>
                <div className="extrainfo">
                    <div>To: {item.to}</div>
                    <div>From: {item.from}</div>
                    <div>Via: {item.via}</div>
                </div>
                <button className="archivebutton">
                    {item.is_archived ? "Move to Inbox" : "Archive Call" }
                </button>
            </div>
        </div>
    );
};
export default Call;