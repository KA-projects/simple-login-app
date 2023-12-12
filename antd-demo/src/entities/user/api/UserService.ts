import $api from "../../../pages/auth/utils";
import { UserType } from "../../../pages/auth/types";

export default class UserService {
  static async getUser(username: string) {
    return $api.post<UserType>("/get-user", { username });
  }
}
