import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "../../extensions/with-environment"
import * as SCHEMAS from "./schemas"
import { API_ENDPOINTS } from "./endpoints"
import { ACTION_RESPONSES } from "../../api/endpoint.types"

export const GalleryStore = types
    .model({
        galleriesData: types.maybeNull(SCHEMAS.GalleryPaginated),
        galleryItemsData: types.maybeNull(SCHEMAS.GalleryItems),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        getGalleryData: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getGallery, {})
            switch (response.status) {
                case 200:
                    self.galleriesData = SCHEMAS.GalleryPaginated.create(response.data)
                    return ACTION_RESPONSES.success
                case 400:
                    return ACTION_RESPONSES.failure
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return ACTION_RESPONSES.failure
        }),
        getGalleryItemsData: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getGalleryItem, {})
            switch (response.status) {
                case 200:
                    self.galleryItemsData = SCHEMAS.GalleryItems.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return false
        }),
    }))
