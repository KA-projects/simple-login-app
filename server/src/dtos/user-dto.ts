interface IUserFromDB {
  email: string;
  _id: string;
  username: string;
}

export default class UserDto {
  email: string;
  id: string;
  username: string;

  constructor(user: IUserFromDB) {
    this.email = user.email;
    this.id = user._id;
    this.username = user.username;
  }
}
