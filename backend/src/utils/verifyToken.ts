import { JwtPayload, verify } from "jsonwebtoken";

export const verifyToken = async (
  token: string
): Promise<string | JwtPayload | null | undefined> => {
  try {
    return verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    console.error(err);
  }
};
