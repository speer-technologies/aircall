import React, { useState, useEffect } from 'react';
import '../../css/header.css';

const ActivityFeed = () => {

    const [calls, setCalls] = useState([]);

    useEffect(() => {
        const fetchCalls = async () => {
            try {
                const response = await fetch('https://aircall-backend.onrender.com/activities');
                const data = await response.json();
                setCalls(data);
            } catch (error) {
                console.error('Error fetching calls:', error);
            }
        };

        fetchCalls();
    }, []);

    return (
        <div className="activity-feed-container">
            <h2 className="activity-feed-title">Call List</h2>
            <ul className="call-list">
                {calls.map((call) => (
                    <li key={call.id} className="call-item">
                        <div className="call-details">
                            <span
                                className={`call-icon ${call.direction === 'inbound' ? 'inbound' : 'outbound'}`}
                            ></span>
                            <span className="call-info">
                                {call.direction === 'inbound' ? 'Incoming' : 'Outgoing'} call from {call.from}
                            </span>
                        </div>
                        <span className="call-info">
                            <strong>To:</strong> {call.to}
                        </span>
                        <span className="call-info">
                            <strong>Duration:</strong> {call.duration} seconds
                        </span>
                        <span className="call-info">
                            <strong>Call Type:</strong> {call.call_type}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActivityFeed;