import cloudinary from "../config/cloudinary.config";
import { CustomError } from "../middlewares/error-handler.middleware";

export const profileImageUploader = async (path: string, dir = "/") => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(path, {
      unique_filename: true,
      folder: "SchoolManagementSystem" + "-" + dir,
    });

    return {
      public_id,
      path: secure_url,
    };
  } catch (error) {
    console.log(error);
    throw new CustomError("error on file uploading on cloudinary", 400);
  }
};
