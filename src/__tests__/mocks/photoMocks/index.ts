import { IPhotoRequisition } from "../../../interfaces/photos";

const file = {
  fieldname: "files",
  originalname: "andre.jpg",
  encoding: "7bit",
  mimetype: "image/jpeg",
  destination: "upload",
  filename: "andre.jpg",
  path: "upload\\andre.jpg",
  size: 3160076,
};

export const MockedPhoto: IPhotoRequisition = {
  file,
};

export const MockedPhoto2: IPhotoRequisition = {
  file,
};
