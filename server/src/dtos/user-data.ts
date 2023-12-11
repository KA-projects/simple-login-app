import { UserAndTokens } from "../types";
import UserDto from "./user-dto";

export default class UserDataDto {
  user: UserDto;
  accessToken: string;

  constructor(userData: Awaited<UserAndTokens>) {
    this.user = userData.user;
    this.accessToken = userData.accessToken;
  }
}
