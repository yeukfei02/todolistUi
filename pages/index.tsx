import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';

function MainPage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (username) {
      createUser(username);
    }
  }, [username]);

  const createUser = async (username: string) => {
    const response = await fetch(`/api/user/${username}`);
    const result = await response.json();
    console.log('result = ', result);
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

  return (
    <div>
      <div className="site-card-border-less-wrapper">
        <Card title="Todo list" bordered={false} style={{ width: '50em' }}>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default MainPage;
