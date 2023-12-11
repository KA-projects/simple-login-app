import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

const TokenModel =
  mongoose.models.Token || mongoose.model("Token", tokenSchema);

export default TokenModel;
