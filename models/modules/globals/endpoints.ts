
import {
    API_ENDPOINT,
    REQUEST_METHOD,
} from "../../api/endpoint.types"
// import * as SCHEMAS from "./schemas"

const TRANSFORMERS = {
    faqTransformer: (data:Record<string,any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on)
    }),
    faqPaginatedTransformer: (data:Record<string,any>) => (
        {
        ...data,
        results: data.results.map(TRANSFORMERS.faqTransformer),
    }),
};

export const API_ENDPOINTS = {
    getFAQ: new API_ENDPOINT({
        url: "/global_constant/faq/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    getFAQCategory: new API_ENDPOINT({
        url: "/global_constant/faq-category/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: TRANSFORMERS.faqPaginatedTransformer,
    }),
    getPrivacyPolicy: new API_ENDPOINT({
        url: "/global_constant/globals/privacy_policy/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    getCookies: new API_ENDPOINT({
        url: "/global_constant/globals/cookie_policy/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    getTermsAndConditions: new API_ENDPOINT({
        url: "/global_constant/globals/terms_and_conditions/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
}


