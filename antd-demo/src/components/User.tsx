import { useState, useEffect } from "react";
import { LoaderFunction } from "react-router";

import { useLoaderData } from "react-router-dom";
import { RegisterUserType, UserType } from "../types";
import { useMutation } from "@tanstack/react-query";

import UserService from "../api/services/UserService";

import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { haveAuth } from "../redux/authSlice";

export const loader: LoaderFunction<string> = async ({ params }) => {
  return await params.username;
};

const User = () => {
  const [userInfo, setUserInfo] = useState<UserType | undefined>(undefined);
  const username = useLoaderData() as string;

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 6,
    });
  };

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
            const errorMessage = error.response?.data as string;

            const startIndex = errorMessage.match(/Error:/)?.index;
            const endIndex = errorMessage.match(/<br>/)?.index;

            if (startIndex && endIndex) {
              const filteredMsg = errorMessage
                .slice(startIndex + 6, endIndex)
                .trim();

              warning(filteredMsg);
            }
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

export default User;
