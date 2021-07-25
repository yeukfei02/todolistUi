import React from 'react';
import Head from 'next/head';
import MainPageComponent from '../components/MainPageComponent';

function MainPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>todolistUi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <MainPageComponent />
    </div>
  );
}

export default MainPage;
