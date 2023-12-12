import { useState, useEffect } from "react";
import { LoaderFunction } from "react-router";

import { useLoaderData } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

import { haveAuth } from "../../../app/redux/authSlice";
import {
  BackendError,
  RegisterUserType,
  UserType,
} from "../../../pages/auth/types";
import UserService from "../api/UserService";
import { warning } from "../../../features/message/warning";

export const loader: LoaderFunction<string> = async ({ params }) => {
  return await params.username;
};

export const User = () => {
  const [userInfo, setUserInfo] = useState<UserType | undefined>(undefined);
  const username = useLoaderData() as string;

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: ({ username }: Pick<RegisterUserType, "username">) => {
      return UserService.getUser(username);
    },
  });

  useEffect(() => {
    mutation.mutate(
      { username },
      {
        onSuccess: (response) => {
          setUserInfo(response.data);
          dispatch(haveAuth());
        },
        onError: (error) => {
          console.log("error: ", error);

          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data as BackendError;

            warning(errorMessage.message, messageApi);
          }
        },
      }
    );
  }, [username]);

  return (
    <div>
      {contextHolder}
      <h2>Пользователь</h2>
      <div className="user">
        {mutation.isPending ? (
          <p>...Loading </p>
        ) : (
          <>
            <p>
              Имя пользователя: <span>{userInfo?.username} </span>
            </p>
            <p>
              Почта: <span> {userInfo?.email} </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
