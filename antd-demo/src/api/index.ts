import { UserType } from "../types/user";

const url = "http://localhost:5000/login";

export const createUser = async (user: UserType) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getUser = async (username: string) => {
  try {
    const res = await fetch(`${url}/${username}`);

    if (res.ok) {
      const data = await res.json();

      return data as UserType;
    }
  } catch (error) {
    console.log(error.message);
  }
};
