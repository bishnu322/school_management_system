import multer from "multer";
import fs from "fs";
import path from "path";
import { CustomError } from "./error-handler.middleware";
import { Request } from "express";

export const fileUploader = () => {
  const fileSize = 5 * 1024 * 1024;
  const allowedExtensions = ["jpg", "png", "webp", "gif", "svg", "jpeg"];

  const storeData = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder_name = "profile_image/";
      if (!fs.existsSync(folder_name)) {
        fs.mkdirSync(folder_name, { recursive: true });
      }
      cb(null, folder_name);
    },
    filename: (req: any, file, cb) => {
      const unique_name = Date.now() + "-" + file.originalname;

      cb(null, unique_name);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).replace(".", "");
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      const err = new CustomError("file extension does not match", 400);
      cb(err);
    }
  };

  const upload = multer({
    storage: storeData,
    limits: { fileSize },
    fileFilter,
  });

  return upload;
};
