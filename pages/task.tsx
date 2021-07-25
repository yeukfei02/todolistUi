import React from 'react';
import Head from 'next/head';
import TaskComponent from '../components/TaskComponent';

function Task(): JSX.Element {
  return (
    <div>
      <Head>
        <title>todolistUi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TaskComponent />
    </div>
  );
}

export default Task;
