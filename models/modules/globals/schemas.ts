import { Instance, types } from "mobx-state-tree"
import { BaseModelSchemaBase, PaginatedSchemaBase } from "../../api/endpoint.types"
import { i18nJSON } from "../i18n/schema"

export const FAQSchema = types.model({
    id: types.string,
    faq_category: types.frozen<i18nJSON>(),
    question: types.frozen<i18nJSON>(),
    answer: types.frozen<i18nJSON>(),
})
export interface FAQType extends Instance<typeof FAQSchema> { }

export const FAQSchemaType = types.model({
    ...PaginatedSchemaBase,
    results: types.array(FAQSchema),
})
export interface FAQSchemaType extends Instance<typeof FAQSchemaType> { }

export const FAQCategorySchema = types.model({
    id: types.maybeNull(types.string),
    created_on: types.maybeNull(types.Date),
    edited_on: types.maybeNull(types.Date),
    name: types.frozen<i18nJSON>(),
})
export const FAQCategorySchemaType = types.model({
    ...PaginatedSchemaBase,
    results: types.array(FAQCategorySchema),
})
export interface FAQCategorySchemaType extends Instance<typeof FAQCategorySchemaType> { }

export const PrivacySchema = types.model({
    id: types.string,
    key: types.string,
    data: types.frozen<i18nJSON>(),
})
export const PrivacySchemaType = types.model({
    results: PrivacySchema
})
export interface PrivacySchemaType extends Instance<typeof PrivacySchemaType> { }

export const CookiesSchema = types.model({
    id: types.string,
    key: types.string,
    data: types.frozen<i18nJSON>(),
})
export interface CookiesType extends Instance<typeof CookiesSchema> { }

export const CookiesSchemaType = types.model({
    results: CookiesSchema
})
export interface CookiesSchemaType extends Instance<typeof CookiesSchemaType> { }

export const TermsAndConditionsSchema = types.model({
    id: types.string,
    key: types.string,
    data: types.frozen<i18nJSON>(),
})
export const TermsAndConditionsType = types.model({
    results: TermsAndConditionsSchema
})
export interface PrivacySchemaType extends Instance<typeof TermsAndConditionsType> { }