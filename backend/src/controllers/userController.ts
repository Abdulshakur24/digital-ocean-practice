import { Request, Response } from "express";
import { prisma } from "../db/config";
import * as Yup from "yup";
import {
  blacklistFilter,
  extractUserIDFromToken,
  hashPassword,
} from "../utils/helper";
import { createToken } from "../utils/createToken";
import { getIO } from "../utils/socket";
import fs from "fs";

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!(email && password)) return res.sendStatus(401);

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.sendStatus(404);

    const safelyBlackListedUser = blacklistFilter(user, [
      "password",
      "tokenVersion",
    ]);

    const token = createToken(safelyBlackListedUser);

    return res.send({
      user: safelyBlackListedUser,
      token,
    });
  } catch (err: any) {
    return res.status(403).send({ message: err });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body;

  const registrationForm = Yup.object().shape({
    fName: Yup.string().min(2).required("Please enter your first name."),
    lName: Yup.string().min(2),
    email: Yup.string().email("Email is invalid").required(),
    password: Yup.string()
      .min(5, "Password must have at least 5 characters.")
      .required(),
  });

  try {
    await registrationForm.validate(data);

    const user = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (user)
      return res.status(409).send({ message: `That email already exist.` });

    const registeredUser = await prisma.users.create({
      data: { ...data, password: await hashPassword(data.password) },
    });

    const safelyBlackListedUser = blacklistFilter(registeredUser, [
      "password",
      "tokenVersion",
    ]);

    const token = createToken(safelyBlackListedUser);

    return res.send({
      user: safelyBlackListedUser,
      token,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(403).send({ message: err.errors });
  }
};

export const updateUserProfileInfo = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization as string;
  const [, token] = authorization.split(" ");
  const userId = await extractUserIDFromToken(token);

  const data = req.body;

  const registrationForm = Yup.object({
    fName: Yup.string().min(2).required("Please enter your first name."),
    lName: Yup.string(),
    email: Yup.string().email("Email is invalid").required(),
  });

  try {
    await registrationForm.validate(data);

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data,
    });

    const safelyBlackListedUser = blacklistFilter(updatedUser, [
      "password",
      "tokenVersion",
    ]);

    const io = getIO();

    io.emit("user-update", { user: safelyBlackListedUser });

    return res.sendStatus(200);
  } catch (err: any) {
    console.log(err);
    return res.status(403).send({ message: err.errors });
  }
};

export const updateUserProfileStatus = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization as string;
  const [, token] = authorization.split(" ");
  const userId = await extractUserIDFromToken(token);

  const { status } = req.body;

  if (!status) res.status(403).send({ message: "Title required!" });

  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { status },
    });

    const safelyBlackListedUser = blacklistFilter(updatedUser, [
      "password",
      "tokenVersion",
    ]);

    const io = getIO();

    io.emit("user-update", { user: safelyBlackListedUser });

    return res.sendStatus(200);
  } catch (err: any) {
    console.log(err);
    return res.status(403).send({ message: err.errors });
  }
};

export const updateUserProfilePic = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization as string;
  const [, token] = authorization.split(" ");
  const userId = await extractUserIDFromToken(token);

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (user?.profilePic) {
    try {
      fs.unlinkSync(`./public/images/${user.profilePic}`);
      console.log(`${user.profilePic} successfully deleted from storage.`);
    } catch (error) {
      console.error(error);
    }
  }

  const file = req.file as Express.Multer.File;

  const profileFileUrl = file.filename;

  const updatedUser = await prisma.users.update({
    where: { id: userId },
    data: { profilePic: profileFileUrl },
  });

  const safelyBlackListedUser = blacklistFilter(updatedUser, [
    "password",
    "tokenVersion",
  ]);

  const io = getIO();
  io.emit("user-update", {
    user: safelyBlackListedUser,
  });

  return res.sendStatus(200);
};
