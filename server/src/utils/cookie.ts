import { Response } from "express";
import { UserAndTokens } from "../types";

export const responseCookie = (
  userData: Awaited<UserAndTokens>,
  res: Response
) => {
  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};
