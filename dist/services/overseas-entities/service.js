"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = require("./mapping");
const mapping_2 = __importDefault(require("../../mapping/mapping"));
class OverseasEntityService {
    constructor(client) {
        this.client = client;
    }
    getOverseasEntity(transactionId, overseasEntityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `transactions/${transactionId}/overseas-entity/${overseasEntityId}`;
            const response = yield this.client.httpGet(URL);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status,
                resource: mapping_1.mapOverseasEntityResource(response.body)
            };
            return resource;
        });
    }
    getOverseasEntityDetails(transactionId, overseasEntityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/details`;
            const response = yield this.client.httpGet(URL);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status,
                resource: mapping_1.mapOverseasEntityExtraDetails(response.body)
            };
            return resource;
        });
    }
    postOverseasEntity(transactionId, body, isSaveAndResumeFeatureActive = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = (isSaveAndResumeFeatureActive)
                ? `/transactions/${transactionId}/overseas-entity/start`
                : `/transactions/${transactionId}/overseas-entity`;
            const response = yield this.client.httpPost(URL, mapping_1.mapOverseasEntity(body));
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            resource.resource = Object.assign({}, response.body);
            return resource;
        });
    }
    putOverseasEntity(transactionId, overseasEntityId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `transactions/${transactionId}/overseas-entity/${overseasEntityId}`;
            const resp = yield this.client.httpPut(URL, mapping_1.mapOverseasEntity(body));
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            return { httpStatusCode: resp.status };
        });
    }
    /**
     * Get private beneficial owner data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     */
    getBeneficialOwnerPrivateData(transactionId, overseasEntityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/beneficial-owners`;
            const response = yield this.client.httpGet(URL);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status,
                resource: mapping_2.default.camelCaseKeys(response.body)
            };
            return resource;
        });
    }
    getManagingOfficersPrivateData(transactionId, overseasEntityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/managing-officers`;
            const response = yield this.client.httpGet(URL);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status,
                resource: mapping_2.default.camelCaseKeys(response.body)
            };
            return resource;
        });
    }
}
exports.default = OverseasEntityService;
//# sourceMappingURL=service.js.map