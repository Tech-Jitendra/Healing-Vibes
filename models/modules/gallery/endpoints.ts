import { API_ENDPOINT, REQUEST_METHOD } from "../../api/endpoint.types";
import * as SCHEMAS from "./schemas"

const TRANSFORMERS = {
  // ------------------------ gallery items transformer
  galleryItemTransformer: (data:Record<string,any>) => ({
    ...data,
    created_on: new Date(data.created_on),
    edited_on: new Date(data.edited_on),
  }),
  galleryItemsTransformer: (data:Record<string,any>) => ({
    ...data,
    results: data.results.map(TRANSFORMERS.galleryItemTransformer),
  }),
  // ------------------------ gallery transformer
  galleryImagesTransformer: (data:Record<string,any>) => ({
    ...data,
    created_on: new Date(data.created_on),
    edited_on: new Date(data.edited_on),
  }),
  galleryTransformer: (data:Record<string,any>) => ({
    ...data,
    created_on: new Date(data.created_on),
    edited_on: new Date(data.edited_on),
    gallery_image: data.gallery_image.map(TRANSFORMERS.galleryImagesTransformer),
  }),
  galleriesTransformer: (data:Record<string,any>) => ({
    ...data,
    results: data.results.map(TRANSFORMERS.galleryTransformer),
  }),
};

export const API_ENDPOINTS = {
  getGallery: new API_ENDPOINT({
    url: "/api/gallery/",
    method: REQUEST_METHOD.GET,
    response: SCHEMAS.GalleryPaginated,
    transformer: TRANSFORMERS.galleriesTransformer,
  }),
  getGalleryItem: new API_ENDPOINT({
    url: "/api/gallery/item/",
    method: REQUEST_METHOD.GET,
    response: null,
    transformer: TRANSFORMERS.galleryItemsTransformer,
  }),
};
