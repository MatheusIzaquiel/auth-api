import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/user";

export const generateToken = (user: TokenPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};
