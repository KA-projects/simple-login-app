import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthResponse } from "../types";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { haveAuth } from "../redux/authSlice";
import { message } from "antd";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();


  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 6,
    });
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
    },
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.accessToken);

      dispatch(haveAuth());
      navigate(`/user/${response.data.user.username}`, { replace: true });
    },
    onError: (error) => {
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
  });

  useEffect(() => {
    const haveToken = localStorage.getItem("token");

    if (haveToken) {
      mutation.mutate();
    }
  }, []);

  return {context:contextHolder};
};
