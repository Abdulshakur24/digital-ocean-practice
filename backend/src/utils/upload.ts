import path from "path";
import multer from "multer";
import { Request } from "express";

const publicFolder = path.resolve(__dirname, "..", "..", "public", "images");

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(console.error("Error invalid image format!"), false);
  }
};

export default {
  directory: publicFolder,
  fileFilter,
  storage: multer.diskStorage({
    destination: publicFolder,
    filename(req, file, cb) {
      const fileName = new Date().getTime() + path.extname(file.originalname);
      return cb(null, fileName);
    },
  }),
};
