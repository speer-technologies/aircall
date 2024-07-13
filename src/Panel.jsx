import Call from "./Call.jsx";
const Panel = ({calldata, inbox}) => {
    return (
        <div className="panel">
            {/* todo: add un/archive button here */}
            {calldata && calldata.filter(raw => (raw.is_archived === false && inbox == "Inbox" ||
                                    raw.is_archived === true && inbox == "Archived"
            )).map((item) => {
                return (
                <div key={item.id}>
                    <Call item={item} />
                </div>
                )
            })}
        </div>
    );
};
export default Panel;