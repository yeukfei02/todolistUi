import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ROOT_URL = `https://todo-list-api-v1.herokuapp.com/api`;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const type = req.query.taskParam[0];
  const id = req.query.taskParam[1];

  switch (type) {
    case 'createTask':
      const createTaskData = {
        taskMessage: req.query.taskParam[2],
        userId: parseInt(req.query.taskParam[3], 10),
      };
      createTask(res, createTaskData);
      break;
    case 'getTaskByUserId':
      const userId = req.query.taskParam[2];
      getTaskByUserId(res, userId);
      break;
    case 'getTaskById':
      getTaskById(res, id);
      break;
    case 'updateTaskById':
      const updateTaskByIdData = {
        taskMessage: req.query.taskParam[2],
        userId: parseInt(req.query.taskParam[3], 10),
      };
      updateTaskById(res, id, updateTaskByIdData);
      break;
    case 'deleteTaskById':
      deleteTaskById(res, id);
      break;
  }
};

async function createTask(res: NextApiResponse, data: any) {
  try {
    const result = await axios.post(`${ROOT_URL}/task/create-task`, data);

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

async function getTaskByUserId(res: NextApiResponse, userId: string) {
  try {
    const result = await axios.get(`${ROOT_URL}/task`, {
      params: {
        userId: userId,
      },
    });

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

async function getTaskById(res: NextApiResponse, id: string) {
  try {
    const result = await axios.get(`${ROOT_URL}/task/${id}`);

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

async function updateTaskById(res: NextApiResponse, id: string, data: any) {
  try {
    const result = await axios.put(`${ROOT_URL}/task/${id}`, data);

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

async function deleteTaskById(res: NextApiResponse, id: string) {
  try {
    const result = await axios.delete(`${ROOT_URL}/task/${id}`);

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}
