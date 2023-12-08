import { useState, useEffect } from "react";
import { LoaderFunction } from "react-router";
import { getUser } from "../api";
import { useLoaderData } from "react-router-dom";
import { UserType } from "../types/user";

export const loader: LoaderFunction<string> = async ({ params }) => {
  return await params.username;
};

const User = () => {
  const [userInfo, setUserInfo] = useState<UserType | undefined>(undefined);
  const username = useLoaderData();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(username as string);

      setUserInfo(user);
    };

    fetchUser();
  }, [username]);
  return (
    <div>
      <h2>Пользователь</h2>
      <div className="user">
        <p>
          Имя пользователя: <span>{userInfo?.username} </span>
        </p>
        <p>
          Почта: <span> {userInfo?.email} </span>
        </p>
      </div>
    </div>
  );
};

export default User;
