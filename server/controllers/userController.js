import User from "../models/user.model.js";

//createUser
export const createUser = async (req, res) => {
  if (!req.body) {
    console.error("require body is null");
  }

  const { email, username, password } = req.body;

  try {
    const addedUser = await User.create({ email, username, password });

    if (!addedUser) {
      throw new Error("user not added");
    }
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// getUser
export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
