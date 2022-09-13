import { ICategoryRequest } from "../../../interfaces/categories";
import { ITypeRequest } from "../../../interfaces/types";
import { IPhotoRequest, IPhotoRequestPatch } from "../../../interfaces/photos";

export const mockedCategory: ICategoryRequest = {
  name: "Apartment",
};

export const mockedCategory2: ICategoryRequest = {
  name: "House",
};

export const mockedCategory3: ICategoryRequest = {
  name: "Flat",
};

export const mockedCategory4: ICategoryRequest = {
  name: "Inn",
};

export const mockedCategory5: ICategoryRequest = {
  name: "Boutique Hotel",
};

export const mockedCategoryTooLarge: ICategoryRequest = {
  name: "conectitur conetur confectum conferebamus confidam i",
};

export const mockedPhoto: IPhotoRequest = {
  file: "urldocloudinary",
  accommodationId: "",
};

export const mockedPhotoPatch: IPhotoRequestPatch = {
  content: "thisIsAStringBase64, Mas essa mudou agora",
};

export const mockedType: ITypeRequest = {
  name: "A whole place",
};

export const mockedType2: ITypeRequest = {
  name: "A whole room",
};

export const mockedType3: ITypeRequest = {
  name: "A shared room",
};

export const mockedTypeTooLarge: ICategoryRequest = {
  name: "conectitur conetur confectum conferebamus confidam i",
};
