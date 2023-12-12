import { isEmail, length } from "class-validator";
import ApiError from "../exceptions/api-error";

export const validation = (email: string, password?: string) => {
  if (!isEmail(email)) {
    throw ApiError.BadRequest("Некорректный email");
  }

  if (password) {
    if (!length(password, 8, 25)) {
      throw ApiError.BadRequest(
        "Пароль должен содержать минимум 8 символов и максимум 25 символов"
      );
    }

    if (!/[A-Z]/.test(password)) {
      throw ApiError.BadRequest(
        "Пароль должен содержать минимум одну заглавную букву"
      );
    }
  }

  
};
