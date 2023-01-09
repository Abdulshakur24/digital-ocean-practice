import { sign, verify } from "jsonwebtoken";

export const createToken = (user: any): string => {
  return sign(user, process.env.JWT_SECRET as string, {
    expiresIn: 2 * 60 * 60 * 1000,
  });
};

// export const createRefreshToken = (user: User): string => {
//   const { refreshSecret, refreshExpiresIn } = authConfig;

//   return sign({ id: user.id, tokenVersion: user.tokenVersion }, refreshSecret, {
//     expiresIn: refreshExpiresIn
//   });
// };
