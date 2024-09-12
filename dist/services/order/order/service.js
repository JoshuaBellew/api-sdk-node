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
const result_1 = require("../../../services/result");
const mapping_1 = __importDefault(require("../../../mapping/mapping"));
class OrderService {
    constructor(client) {
        this.client = client;
    }
    getOrder(orderId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet("/orders/" + orderId);
            if (resp.error) {
                return result_1.failure({
                    httpStatusCode: resp.status,
                    error: (_a = resp.error) === null || _a === void 0 ? void 0 : _a.error
                });
            }
            const body = resp.body;
            const result = mapping_1.default.camelCaseKeys(body, OrderService.EXCLUDED_FIELDS);
            return result_1.success(result);
        });
    }
}
exports.default = OrderService;
OrderService.EXCLUDED_FIELDS = {
    deep: true,
    stopPaths: [
        "items.description_values",
        "items.item_options.filing_history_description_values",
        "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
    ]
};
//# sourceMappingURL=service.js.map