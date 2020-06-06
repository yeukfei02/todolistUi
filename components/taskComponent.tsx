import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function TaskComponent() {
  const router = useRouter();

  const [userTaskList, setUserTaskList] = useState<any[]>([]);
  const [taskMessage, setTaskMessage] = useState('');

  const userId = router.query.userId as string;

  useEffect(() => {
    if (userId) getUserTaskList(userId);
  }, [userId]);

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
    console.log('result = ', result);

    if (result) {
      getUserTaskList(userId);
    }
  };

  const getUserTaskList = async (userId: string) => {
    if (userId) {
      const response = await fetch(`/api/task/getTaskByUserId/1/${userId}`);
      const result = await response.json();
      console.log('result = ', result);

      if (result && result.result.tasks) {
        setUserTaskList(result.result.tasks);
      }
    }
  };

  const deleteTaskById = async (id: string) => {
    const response = await fetch(`/api/task/deleteTaskById/${id}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result) {
      getUserTaskList(userId);
    }
  };

  const renderUserTaskList = () => {
    let result = null;

    if (userTaskList) {
      result = userTaskList.map((item: any, i: number) => {
        const taskId = item.taskId;
        const titleText = `#${i + 1}`;

        return (
          <Card
            key={i}
            title={
              <div style={{ cursor: 'pointer' }} onClick={() => handleTitleTextClick(taskId, userId)}>
                {titleText}
              </div>
            }
            style={{ marginTop: '2em' }}
            extra={
              <DeleteOutlined
                style={{ color: 'red', fontSize: '1.3em', cursor: 'pointer' }}
                onClick={() => handleDeleteTask(taskId)}
              />
            }
          >
            <p>{item.taskMessage}</p>
          </Card>
        );
      });
    }

    return result;
  };

  const handleTitleTextClick = (taskId: string, userId: string) => {
    if (taskId) {
      router.push({
        pathname: '/task-details',
        query: { taskId: taskId, userId: userId },
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (taskId) {
      deleteTaskById(taskId);
    }
  };

  const handleGoHome = () => {
    router.push({
      pathname: `/`,
    });
  };

  return (
    <div>
      <div className="card-view">
        <Card title="Task list" bordered={false} style={{ width: '50em' }}>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Task message"
              name="taskMessage"
              rules={[{ required: true, message: 'Please enter your task message' }]}
            >
              <TextArea rows={5} placeholder="Enter task message" allowClear />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create task message
              </Button>
            </Form.Item>
          </Form>

          <Button htmlType="submit" block onClick={handleGoHome}>
            Home
          </Button>
        </Card>
      </div>

      <Row>
        <Col span={12} offset={6}>
          {renderUserTaskList()}
        </Col>
      </Row>
    </div>
  );
}

export default TaskComponent;
