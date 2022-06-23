import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import InteractiveList from './components/ActivityFeed.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <div className="container-view">Archive all</div>
      <div className="call-log">
        <InteractiveList />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
