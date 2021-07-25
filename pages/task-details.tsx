import React from 'react';
import Head from 'next/head';
import TaskDetailsComponent from '../components/TaskDetailsComponent';

function TaskDetails(): JSX.Element {
  return (
    <div>
      <Head>
        <title>todolistUi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TaskDetailsComponent />
    </div>
  );
}

export default TaskDetails;
