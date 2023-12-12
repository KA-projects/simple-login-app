import $api from "..";
import { UserType } from "../../types";

export default class UserService {
  static async getUser(username: string) {
    return $api.post<UserType>("/get-user", {username});
  }
}
