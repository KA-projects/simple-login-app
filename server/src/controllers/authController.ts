import User from "../models/user.model.ts";

import { NextFunction, Request, Response } from "express";
import userService from "../service/user-service.ts";

import UserDataDto from "../dtos/user-data.ts";
import ApiError from "../exceptions/api-error.ts";

import { Length, isEmail, isUppercase } from "class-validator";
import { validation } from "../validation/index.ts";

interface RequestWithBody extends Request {
  body: {
    email: string;
    username: string;
    password: string;
  };
}

class AuthController {
  async register(req: RequestWithBody, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;

      validation(email, password);

      const userData = await userService.register(email, password, username);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const userDataDto = new UserDataDto(userData);
      return res.json(userDataDto);
    } catch (error) {
      next(error);
    }
  }

  async login(req: RequestWithBody, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      validation(email);

      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const userDataDto = new UserDataDto(userData);
      return res.json(userDataDto);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: RequestWithBody, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const deleteResult = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(deleteResult);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: RequestWithBody, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const userDataDto = new UserDataDto(userData);
      return res.json(userDataDto);
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthController();

export default authController;
