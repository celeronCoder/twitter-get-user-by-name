import { Router, Request, Response } from "express";
import axios from "axios";
import { User } from "../interfaces";
import { BEARER_TOKEN } from "../constants";

const ApiRouter: Router = Router();

async function fetchUser(username: string): Promise<User | undefined> {
  try {
    const url = `https://api.twitter.com/2/users/by/username/${username}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      params: {
        "user.fields": "name,profile_image_url,username,verified"
      }
    });
    return response.data.data as User;
  } catch (error) {
    console.error(error);
  }
}

ApiRouter.get("/getUser/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    return res.status(200).json(await fetchUser(username));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Bummer! some error occurred!"
    });
  }
});

export default ApiRouter;
