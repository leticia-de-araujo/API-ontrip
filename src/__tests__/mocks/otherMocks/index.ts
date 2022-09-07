import { ICategoryRequest } from "../../../interfaces/categories";
import { ITypeRequest } from "../../../interfaces/types";
import { IPhotoRequest, IPhotoRequestPatch } from "../../../interfaces/photos";

export const mockedCategory: ICategoryRequest = {
  name: "bedroom",
};

export const mockedCategory2: ICategoryRequest = {
  name: "entire accommodation",
};

export const mockedCategory3: ICategoryRequest = {
  name: "upper floor of detached house",
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
