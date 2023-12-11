import UserDto from "../dtos/user-dto.ts";
import User from "../models/user.model.ts";

import { NextFunction, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: {
    username: string;
  };
}

class UserController {
  async getUser(req: RequestWithBody, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;

      const userData = await User.findOne({ username });

      const userDto = new UserDto(userData);

      if (userData) {
        return res.json(userDto);
      } else {
        throw new Error("User not found in database");
      }
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
