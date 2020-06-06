import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ROOT_URL = `https://todo-list-api-v1.herokuapp.com/api`;

export const getAllTask = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get(`${ROOT_URL}/task`);

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
