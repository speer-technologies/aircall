import React from 'react';

import { Header, Image } from '@mantine/core';

const AppHeader = () => {
  return (
    <Header fixed={false} height={50} py={10}>
      <Image style={{ width: '100px', margin: 'auto' }} src="../public/image/logo.svg" alt="logo" />
    </Header>
  );
};

export default AppHeader;
