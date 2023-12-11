import UserDto from "../dtos/user-dto";

export type UserType = {
  email: string;
  id: string;
  username: string;
};

export type UserAndTokens =  Promise<{
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}>;
