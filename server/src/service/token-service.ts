import UserDto from "../dtos/user-dto";
import TokenModel from "../models/token.model";
import { UserType } from "../types";
import jwt from "jsonwebtoken";

class TokenService {
  generateTokens(payload: UserType): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken: string = jwt.sign(
      payload,

      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken: string = jwt.sign(
      payload,
      //@ts-ignore
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "15d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    const haveTokenInDB = await TokenModel.findOne({ user: userId });
    if (haveTokenInDB) {
      haveTokenInDB.refreshToken = refreshToken;
      await haveTokenInDB.save();
      return;
    }

    if (!userId || !refreshToken) {
      throw new Error(
        `userId or refreshToken is not found:${userId} & ${refreshToken} `
      );
    }

    await TokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string | undefined) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateRefreshToken(token: string): UserType | null {
    try {
      const userData = jwt.verify(
        token,

        process.env.JWT_REFRESH_SECRET!
      );

      return userData as UserType;
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token: string): UserType | null {
    try {
      const userData = jwt.verify(
        token,

        process.env.JWT_ACCESS_SECRET!
      );

      return userData as UserType;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

const tokenService = new TokenService();

export default tokenService;
