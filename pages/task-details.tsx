import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Input, Button } from 'antd';

function TaskDetails() {
  const router = useRouter();

  const [taskDetailsTaskId, setTaskDetailsTaskId] = useState<any>({});
  const [taskDetailsTaskMessage, setTaskDetailsTaskMessage] = useState<any>({});
  const [taskDetailsUserId, setTaskDetailsUserId] = useState<any>({});

  const taskId = router.query.taskId as string;
  const userId = router.query.userId as string;

  useEffect(() => {
    if (taskId) getTaskDetailsById(taskId);
  }, [taskId]);

  const onFinish = (values: any) => {
    console.log('Success = ', values);

    if (values.taskId && values.taskMessage && values.userId) {
      updateTaskById(values.taskId, values.taskMessage, values.userId);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed = ', errorInfo);
  };

  const getTaskDetailsById = async (taskId: string) => {
    const response = await fetch(`/api/task/getTaskById/${taskId}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result) {
      setTaskDetailsTaskId(result.result.task.taskId);
      setTaskDetailsTaskMessage(result.result.task.taskMessage);
      setTaskDetailsUserId(result.result.task.userId);
    }
  };

  const handleTaskIdChange = (e: any) => {
    if (e.target.value) {
      setTaskDetailsTaskId(e.target.value);
    }
  };

  const handleTaskMessageChange = (e: any) => {
    if (e.target.value) {
      setTaskDetailsTaskMessage(e.target.value);
    }
  };

  const handleUserIdChange = (e: any) => {
    if (e.target.value) {
      setTaskDetailsUserId(e.target.value);
    }
  };

  const updateTaskById = async (taskId: string, taskMessage: string, userId: string) => {
    const response = await fetch(`/api/task/updateTaskById/${taskId}/${taskMessage}/${userId}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result) {
      getTaskDetailsById(taskId);
    }
  };

  const deleteTaskById = async (id: string) => {
    const response = await fetch(`/api/task/deleteTaskById/${id}`);
    const result = await response.json();
    console.log('result = ', result);

    if (result) {
      router.push({
        pathname: `/task`,
        query: { userId: userId },
      });
    }
  };

  const handleDelete = () => {
    if (taskId) {
      deleteTaskById(taskId);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="card-view">
      <Card title="Task details" bordered={false} style={{ width: '50em' }}>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Task id" name="taskId" rules={[{ required: true, message: 'Please enter your task id' }]}>
            <Input
              placeholder="Enter task id"
              allowClear
              value={taskDetailsTaskId}
              onChange={(e) => handleTaskIdChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Task message"
            name="taskMessage"
            rules={[{ required: true, message: 'Please enter your task message' }]}
          >
            <Input
              placeholder="Enter task message"
              allowClear
              value={taskDetailsTaskMessage}
              onChange={(e) => handleTaskMessageChange(e)}
            />
          </Form.Item>

          <Form.Item label="User id" name="userId" rules={[{ required: true, message: 'Please enter your user id' }]}>
            <Input
              placeholder="Enter user id"
              allowClear
              value={taskDetailsUserId}
              onChange={(e) => handleUserIdChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Update task message
            </Button>
          </Form.Item>
        </Form>

        <Button type="primary" danger htmlType="submit" block style={{ marginBottom: '1.2em' }} onClick={handleDelete}>
          Delete
        </Button>

        <Button htmlType="submit" block onClick={handleBack}>
          Back
        </Button>
      </Card>
    </div>
  );
}

export default TaskDetails;
