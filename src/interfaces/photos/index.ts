export interface IPhoto {
  id: string;
  content: string;
  accommodationid: string;
}

//id gerado automaticamente
export interface IPhotoRequest {
  file: any;
  accommodationId: string;
}

export interface IPhotoRequestPatch {
  content: string;
}

export interface IPhotoRequisition {
  file: any;
}
