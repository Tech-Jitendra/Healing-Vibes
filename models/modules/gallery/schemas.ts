import { Instance, types } from "mobx-state-tree"
import { FAQSchemaBase } from "../../api/endpoint.types"
import { i18nJSON } from "../i18n/schema"

export const GalleryName = {
    homeBannerGallery: "homeBannerGallery",
    homeBookForEventsGallery: "homeBookForEventsGallery",
    homeOpenPlayGallery: "homeOpenPlayGallery",
    bookForEventsGallery: "bookForEventsGallery",
    bookForEventsBannerGallery: "bookForEventsBannerGallery",
    openPlayBannerGallery: "openPlayBannerGallery",
    homeVisitGallery: "homeVisitGallery",
    ourStoryGallery: "ourStoryGallery",
    contactUsGallery: "contactUsGallery",
    workshopBannerGallery: "workshopBannerGallery",
    openPlayGallery: "openPlayGallery",
    mainGallery: "mainGallery",
}


export const GalleryItem = types.model({
    id: types.string,
    name: types.frozen<i18nJSON>(),
    description: types.frozen<i18nJSON>(),
    image: types.maybeNull(types.string),
})

export const GalleryItems = types.model({
    ...FAQSchemaBase,
    results: types.array(GalleryItem),
})
export interface GalleryItemsType extends Instance<typeof GalleryItems> { }

export const GalleryImage = types.model({
    name: types.frozen<i18nJSON>(),
    description: types.frozen<i18nJSON>(),
    image: types.maybeNull(types.string),
    video: types.maybeNull(types.string),
    order: types.maybeNull(types.number)
})

export const Gallery = types.model({
    id: types.string,
    name: types.frozen<i18nJSON>(),
    description: types.frozen<i18nJSON>(),
    gallery_image: types.maybeNull(types.array(GalleryImage)),
})

export const GalleryPaginated = types.model({
    ...FAQSchemaBase,
    results: types.array(Gallery),
})
export interface GalleryPaginatedType extends Instance<typeof GalleryPaginated> { }

