export type RegisterUserType = {
  email: string;
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;

  user: UserType;
};

export type UserType = {
  email: string;

  id: string;
  username: string;
};

export type BackendError = {
  message: string;
  errors: [];
};
