import { ICategoryRequest } from "../../../interfaces/categories";
import { ITypeRequest } from "../../../interfaces/types";
import { IPhotoRequest, IPhotoRequestPatch } from "../../../interfaces/photos";

export const mockedCategory: ICategoryRequest = {
  name: "bedroom",
};
export const mockedPhoto: IPhotoRequest = {
  content: "thisIsAStringBase64",
  accommodationId: "",
};

export const mockedPhotoPatch: IPhotoRequestPatch = {
  content: "thisIsAStringBase64, Mas essa mudou agora",
};

export const mockedType: ITypeRequest = {
  name: "apartment",
};
