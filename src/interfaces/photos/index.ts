export interface IPhoto {
  id: string;
  content: string;
  accommodationid: string;
}

//id gerado automaticamente
export interface IPhotoRequest {
  content: any;
  accommodationId: string;
}

export interface IPhotoRequestPatch {
  content: string;
}
