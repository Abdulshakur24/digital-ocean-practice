import { Router, static as expressStatic } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import * as userController from "../controllers/userController";
import uploadConfig from "../utils/upload";
import multer from "multer";

const upload = multer(uploadConfig);

export default Router()
  .post("/login", userController.signInUser)
  .post("/register", userController.registerUser)
  .use(isAuthenticated)
  .put("/info", userController.updateUserProfileInfo)
  .put("/status", userController.updateUserProfileStatus)
  .put(
    "/pic",
    upload.single("profileImage"),
    userController.updateUserProfilePic
  );
