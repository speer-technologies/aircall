import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Feed from "./Feed.jsx";
import Navigator from "./Navigator.jsx";
import Header from "./Header.jsx";
import Detail from "./Detail.jsx";

const App = () => {
  const [feed, setFeed] = useState(null);
  const [recent, setRecent] = useState(true);
  const [detail, setDetail] = useState();

  const fetchActivities = (setFeed) => {
    return fetch("https://aircall-job.herokuapp.com/activities").then(
      (response) => {
        return response.json();
      }
    );
  };

  const fetchDetail = (id) => {
    return fetch("https://aircall-job.herokuapp.com/activities/" + id).then(
      (response) => {
        return response.json();
      }
    );
  };

  useEffect(() => {
    try {
      fetchActivities().then((data) => {
        setFeed(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  let page = (
    <Feed feed={feed} recent={recent} onSelect={(c) => setDetail(c)} />
  );
  if (detail) {
    page = (
      <Detail
        info={detail}
        onBack={() => setDetail(null)}
        onUpdate={(call) => {
          fetchDetail(call.id).then((data) => setDetail(data));
          fetchActivities().then(data => setFeed(data))
        }}
      />
    );
  }

  {
    console.log(feed);
  }

  return (
    <div className="container">
      <Header />
      {/* <div className="container-view">Some activities should be here</div> */}
      <Navigator
        onPageChange={(r) => {
          setDetail(null);
          setRecent(r);
        }}
        recent={recent}
      />
      <div className="container-view">{page}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
