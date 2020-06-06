import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Card, Button } from 'antd';

function Task() {
  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const response = await fetch(`/api/task`);
    const result = await response.json();
    console.log('result = ', result);
  };

  return <div>123</div>;
}

export default Task;
