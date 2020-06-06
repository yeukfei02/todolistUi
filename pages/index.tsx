import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Input, Button } from 'antd';

function MainPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (username) {
      if (status === 'getMessage') {
        getMessage(username);
      } else if (status === 'createUser') {
        createUser(username);
      }
    }
  }, [username]);

  const getMessage = async (username: string) => {
    const response = await fetch(`/api/user/getMessage/${username}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result && result.result) {
      router.push({
        pathname: '/task',
        query: { userId: result.result.userId },
      });
    }
  };

  const createUser = async (username: string) => {
    const response = await fetch(`/api/user/createUser/${username}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result && result.result) {
      router.push({
        pathname: '/task',
        query: { userId: result.result.userId },
      });
    }
  };

  const onFinish = (values: any) => {
    console.log('Success = ', values);

    if (values.username) {
      setUsername(values.username);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed = ', errorInfo);
  };

  const handleGetMessage = () => {
    setStatus('getMessage');
  };

  const handleCreateUser = () => {
    setStatus('createUser');
  };

  return (
    <div className="card-view">
      <Card title="Todo list" bordered={false} style={{ width: '50em' }}>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter username" allowClear />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block onClick={handleGetMessage}>
              Get message
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" ghost htmlType="submit" block onClick={handleCreateUser}>
              Create user
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default MainPage;
