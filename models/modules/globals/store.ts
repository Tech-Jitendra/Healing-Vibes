import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "../../extensions/with-environment"
import * as SCHEMAS from "./schemas"
import { API_ENDPOINTS } from "./endpoints"
import { ACTION_RESPONSES } from '../../api/endpoint.types';

export const GlobalsStore = types
    .model({
        faqData: types.maybeNull(SCHEMAS.FAQSchemaType),
        faqCategoryData: types.maybeNull(SCHEMAS.FAQCategorySchemaType),
        termsAndConditionsData: types.maybeNull(SCHEMAS.TermsAndConditionsSchema),
        privacyPolicyData: types.maybeNull(SCHEMAS.PrivacySchema),
        cookiesPolicyData: types.maybeNull(SCHEMAS.CookiesSchema),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        getFAQ: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getFAQ, {})
            switch (response.status) {
                case 200:
                    self.faqData = SCHEMAS.FAQSchemaType.create(response.data)
                    return ACTION_RESPONSES.success
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return ACTION_RESPONSES.failure
        }),
        getFAQCategory: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getFAQCategory, {})
            switch (response.status) {
                case 200:
                    self.faqCategoryData = SCHEMAS.FAQCategorySchemaType.create(response.data)
                    return ACTION_RESPONSES.success
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return ACTION_RESPONSES.failure
        }),
        getPrivacyPolicy: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getPrivacyPolicy, {})
            switch (response.status) {
                case 200:
                    self.privacyPolicyData = SCHEMAS.PrivacySchema.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return false
        }),
        getCookiesPolicy: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getCookies, {})
            switch (response.status) {
                case 200:
                    self.cookiesPolicyData = SCHEMAS.CookiesSchema.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return false
        }),
        getTermsAndConditions: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getTermsAndConditions, {})
            switch (response.status) {
                case 200:
                    self.termsAndConditionsData = SCHEMAS.TermsAndConditionsSchema.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return false
        }),
    }))
