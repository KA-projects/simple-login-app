import UserDto from "../dtos/user-dto";
import UserModel from "../models/user.model";
import * as bcrypt from "bcrypt";

import tokenService from "./token-service";
import { UserAndTokens } from "../types";
import ApiError from "../exceptions/api-error";

class UserService {
  async register(email: string, password: string, username: string) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с данной электронной почтой уже существует`
      );
    }
    if (process.env.JWT_ACCESS_SECRET || process.env.JWT_REFRESH_SECRET) {
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      password: hashPassword,
      username,
    });

    const data = this.getUserAndTokens(user);

    return data;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.NotFoundUserError();
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Некорректный пароль");
    }

    const data = this.getUserAndTokens(user);

    return data;
  }

  async logout(refreshToken: string | undefined) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!tokenFromDb) {
      throw ApiError.BadRequest("Токен не найден в базе данных");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.BadRequest("Токен недействителен");
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден в базе данных");
    }

    const data = this.getUserAndTokens(user);

    return data;
  }

  async getUserAndTokens(user: any): UserAndTokens {
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}
const userService = new UserService();

export default userService;
