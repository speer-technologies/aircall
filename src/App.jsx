import React from 'react';
import ReactDOM from 'react-dom';
import { AppShell, MantineProvider } from '@mantine/core';

import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';

const App = () => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <AppShell
        fixed={false}
        header={<AppHeader/>}
        footer={<AppFooter />}
        style={{
          width: 400,
          height: 700,
          margin: 'auto',
        }}
        zIndex={100}
      >
        <div className='container'>
          <div className="container-view">Some activities should be here</div>
        </div>
      </AppShell>
    </MantineProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
