const Tabs = ({inbox, setInbox, tabnames}) => {
    return (
        <div className="tabs">
            {tabnames.map((tab) => {
                return (<button 
                className={inbox === tab ? "tabbutton active" : "tabbutton"}
                key={tab}
                active={inbox === tab ? "active" : undefined}
                onClick={() => setInbox(tab)}>
                    {tab}
                </button>)
            })}
        </div>
    );
}

export default Tabs;