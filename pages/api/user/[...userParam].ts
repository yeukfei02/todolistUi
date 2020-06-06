import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ROOT_URL = `https://todo-list-api-v1.herokuapp.com/api`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const type = req.query.userParam[0];
  const username = req.query.userParam[1];

  switch (type) {
    case 'getMessage':
      getMessage(res, username);
      break;
    case 'createUser':
      createUser(res, username);
      break;
  }
};

async function getMessage(res: NextApiResponse, username: string) {
  try {
    const result = await axios.get(`${ROOT_URL}/user/get-user-id`, 
      {
        params: {
          username: username
        }
      }
    );

    res.status(200).json({
      result: result.data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

async function createUser(res: NextApiResponse, username: string) {
  try {
    const result = await axios.post(`${ROOT_URL}/user/create-user`, {
      username: username,
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
