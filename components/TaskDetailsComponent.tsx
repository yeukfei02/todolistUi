import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Input, Button } from 'antd';

const { TextArea } = Input;

function TaskDetailsComponent(): JSX.Element {
  const router = useRouter();

  const [taskDetailsTaskMessage, setTaskDetailsTaskMessage] = useState<string>('');

  const taskId = router.query.taskId as string;
  const userId = router.query.userId as string;

  const onFinish = (values: any) => {
    console.log('Success = ', values);

    if (taskId && values.taskMessage && userId) {
      updateTaskById(taskId, values.taskMessage, userId);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed = ', errorInfo);
  };

  const handleTaskMessageChange = (e: any) => {
    if (e.target.value) {
      setTaskDetailsTaskMessage(e.target.value);
    }
  };

  const updateTaskById = async (taskId: string, taskMessage: string, userId: string) => {
    const response = await fetch(`/api/task/updateTaskById/${taskId}/${taskMessage}/${userId}`);
    const result = await response.json();
    console.log('result = ', result);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="card-view">
      <Card title="Task details" bordered={false} style={{ width: '50em' }}>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Task message"
            name="taskMessage"
            rules={[{ required: true, message: 'Please enter your task message' }]}
          >
            <TextArea
              rows={5}
              placeholder="Enter task message"
              allowClear
              value={taskDetailsTaskMessage}
              onChange={(e) => handleTaskMessageChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Update task message
            </Button>
          </Form.Item>
        </Form>

        <Button htmlType="submit" block onClick={handleBack}>
          Back
        </Button>
      </Card>
    </div>
  );
}

export default TaskDetailsComponent;
