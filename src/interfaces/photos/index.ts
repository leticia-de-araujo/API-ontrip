export interface IPhoto {
  id: string;
  content: string;
  accommodationid: string;
}

export interface IPhotoRequest {
  file?: any;
  accommodationId: string;
}

export interface IPhotoRequestPatch {
  content: string;
}

export interface IPhotoRequisition {
  file?: any;
}
