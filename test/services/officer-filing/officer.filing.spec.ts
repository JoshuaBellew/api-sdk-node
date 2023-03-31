import {
    ActiveOfficerDetails, OfficerFilingService
} from "../../../src/services/officer-filing";
import * as mockValues from "./officer.filing.mock";
import { expect } from "chai";
import sinon from "sinon";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const CONFIRMATION_STATEMENT_ID = "r4nd0m";
const COMPANY_NUMBER = "11111111";

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("List active Directors details GET", () => {
    it("should return active officer details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<ActiveOfficerDetails[]> = await ofService.getListActiveDirectorDetails(TRANSACTION_ID) as Resource<ActiveOfficerDetails[]>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[1].dateOfBirth).to.equal(mockValues.mockActiveOfficerDetails.date_of_birth);
    });

    it("should return error 404 - No active director details were found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No active officers details were found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});