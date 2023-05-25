export interface AccountValidatorRequest {
    fileName: string;
    id: string;
}
export interface Data {
    balanceSheetDate: string;
    accountsType: string;
    companieshouseRegisteredNumber: string;
}
export interface Result {
    errorMessages: string[];
    data: Data;
    validationStatus: ValidationStatus;
}
export interface AccountValidatorResponse {
    status: RequestStatus;
    result: Result;
    fileId: string;
    fileName: string;
}
declare type RequestStatus = "complete" | "pending";
declare type ValidationStatus = "OK" | "FAILED";
export {};
