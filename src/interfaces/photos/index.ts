export interface IPhoto {
  id: string;
  content: string;
  accommodationid: string;
}

//id gerado automaticamente
export interface IPhotoRequest {
  content: string;
  accommodationId: string;
}

export interface IPhotoRequestPatch {
  content: string;
}
