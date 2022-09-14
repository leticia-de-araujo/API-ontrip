export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryRequest {
  name: string;
}

export interface ICategoryRequestPatch {
  name?: string;
}
