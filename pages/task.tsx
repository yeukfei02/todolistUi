import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Input, Button, Row, Col } from 'antd';

function Task() {
  const router = useRouter();

  const [taskList, setTaskList] = useState([]);
  const [userTaskList, setUserTaskList] = useState([]);

  const [taskMessage, setTaskMessage] = useState('');

  const userId = router.query.userId as string;

  useEffect(() => {
    getAllTask();
  }, []);

  useEffect(() => {
    if (taskList) {
      const userTaskList = taskList.filter((item: any, i: number) => {
        return item.userId.toString() === userId;
      });

      if (userTaskList) {
        setUserTaskList(userTaskList);
      }
    }
  }, [taskList, userId]);

  useEffect(() => {
    if (taskMessage) {
      createTask(taskMessage, userId);
    }
  }, [taskMessage]);

  const onFinish = (values: any) => {
    console.log('Success = ', values);

    if (values.taskMessage) {
      setTaskMessage(values.taskMessage);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed = ', errorInfo);
  };

  const createTask = async (taskMessage: string, userId: string) => {
    const response = await fetch(`/api/task/createTask/1/${taskMessage}/${userId}`);
    const result = await response.json();

    if (result) {
      getAllTask();
    }
  };

  const getAllTask = async () => {
    const response = await fetch(`/api/task`);
    const result = await response.json();

    if (result && result.result.tasks) {
      setTaskList(result.result.tasks);
    }
  };

  const getTaskById = async (id: string) => {
    const response = await fetch(`/api/task/getTaskById/${id}`);
    const result = await response.json();
    console.log('result = ', result);
  };

  const updateTaskById = async (id: string, taskMessage: string, userId: string) => {
    const response = await fetch(`/api/task/updateTaskById/${id}/${taskMessage}/${userId}`);
    const result = await response.json();
    console.log('result = ', result);
  };

  const deleteTaskById = async (id: string) => {
    const response = await fetch(`/api/task/deleteTaskById/${id}`);
    const result = await response.json();
    console.log('result = ', result);
  };

  const renderUserTaskList = () => {
    let result = null;

    if (userTaskList) {
      result = userTaskList.map((item: any, i: number) => {
        const titleText = `#${i + 1}`;

        return (
          <Col key={i} span={24} style={{ marginTop: '2em' }}>
            <Card title={titleText} extra={<a href="#">More</a>}>
              <p>{item.taskMessage}</p>
            </Card>
          </Col>
        );
      });
    }

    return result;
  };

  return (
    <div>
      <div className="card-view">
        <Card title="Todo list" bordered={false} style={{ width: '50em' }}>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Task message"
              name="taskMessage"
              rules={[{ required: true, message: 'Please enter your task message' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Create task message
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <div style={{ width: '50em', margin: '0 auto' }}>
        <Row>{renderUserTaskList()}</Row>
      </div>
    </div>
  );
}

export default Task;
