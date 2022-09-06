export interface IPhoto {
  id: string;
  content: string;
  accommodationid: string;
}

//id gerado automaticamente
export interface IPhotoRequest {
  name: string;
  accommodationId: string;
}

export interface IPhotoRequestPatch {
  name: string;
}
