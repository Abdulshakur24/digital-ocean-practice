import { randomBytes, pbkdf2Sync } from "crypto";
import { verifyToken } from "./verifyToken";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 2048, 32, "sha512").toString("hex");
  return [salt, hash].join("$");
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const [salt, hash] = hashedPassword.split("$");
  const hashed = pbkdf2Sync(password, salt, 2048, 32, "sha512").toString("hex");
  return hash === hashed;
}

export const extractUserIDFromToken = async (token: string) => {
  const decoded = await verifyToken(token);
  if (!decoded || typeof decoded === "string") return {};
  return decoded.id;
};

export const blacklistFilter = <T extends object>(
  obj: T,
  blacklist: (keyof T)[]
): Partial<T> =>
  Object.entries(obj)
    .filter(([key, _]) => !blacklist.includes(key as keyof T))
    .reduce(
      (obj: Partial<T>, [key, value]) => ((obj[key as keyof T] = value), obj),
      {}
    );
