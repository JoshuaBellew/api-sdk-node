import {
    Checkout, CheckoutResource, Item, ItemResource, ItemOptions, ItemOptionsResource,
    CertificateItemOptionsResource, CertifiedCopyItemOptionsResource,
    MissingImageDeliveryItemOptionsResource
} from "./types";
import { MemberDetails } from "../certificates";

export default class CheckoutMapping {
    public static mapCheckoutResourceToCheckout (checkoutResource: CheckoutResource): Checkout {
        const checkout: Checkout = {
            deliveryDetails: {
                addressLine1: checkoutResource?.delivery_details?.address_line_1,
                addressLine2: checkoutResource?.delivery_details?.address_line_2,
                country: checkoutResource?.delivery_details?.country,
                forename: checkoutResource?.delivery_details?.forename,
                locality: checkoutResource?.delivery_details?.locality,
                poBox: checkoutResource?.delivery_details?.po_box,
                postalCode: checkoutResource?.delivery_details?.postal_code,
                region: checkoutResource?.delivery_details?.region,
                surname: checkoutResource?.delivery_details?.surname
            },
            items: checkoutResource.items.map((item) => {
                return this.mapItemResourceToItem(item)
            }),
            etag: checkoutResource.etag,
            kind: checkoutResource.kind,
            links: {
                self: checkoutResource.links.self,
                payment: checkoutResource.links.payment
            },
            paidAt: checkoutResource.paid_at,
            checkedOutBy: {
                email: checkoutResource.checked_out_by.email,
                id: checkoutResource.checked_out_by.id
            },
            status: checkoutResource.status,
            paymentReference: checkoutResource.payment_reference,
            reference: checkoutResource.reference,
            totalOrderCost: checkoutResource.total_order_cost
        }
        return checkout;
    }

    private static mapItemResourceToItem (itemResource: ItemResource): Item {
        return {
            companyName: itemResource.company_name,
            companyNumber: itemResource.company_number,
            customerReference: itemResource.customer_reference,
            description: itemResource.description,
            descriptionIdentifier: itemResource.description_identifier,
            descriptionValues: itemResource.description_values,
            etag: itemResource.etag,
            id: itemResource.id,
            itemCosts: itemResource.item_costs.map((i) => ({
                calculatedCost: i?.calculated_cost,
                discountApplied: i?.discount_applied,
                itemCost: i?.item_cost,
                productType: i?.product_type
            })),
            itemOptions: this.mapItemOptionsResourceToItemOptions(itemResource.item_options, itemResource.kind),
            itemUri: itemResource.item_uri,
            kind: itemResource.kind,
            links: {
                self: itemResource.links.self
            },
            postageCost: itemResource.postage_cost,
            postalDelivery: itemResource.postal_delivery,
            quantity: itemResource.quantity,
            satisfiedAt: itemResource.satisfied_at,
            status: itemResource.status,
            totalItemCost: itemResource.total_item_cost
        }
    }

    private static removeEmptyObjects<T> (input: T): T {
        return Object.values(input).some((value) => value !== undefined) ? input : undefined;
    }

    private static mapItemOptionsResourceToItemOptions (itemResource: ItemOptionsResource, kind: string): ItemOptions {
        if (kind === "item#certificate") {
            itemResource = itemResource as CertificateItemOptionsResource;
            const directorDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.director_details?.include_basic_information,
                includeAddress: itemResource?.director_details?.include_address,
                includeAppointmentDate: itemResource?.director_details?.include_appointment_date,
                includeCountryOfResidence: itemResource?.director_details?.include_country_of_residence,
                includeNationality: itemResource?.director_details?.include_nationality,
                includeOccupation: itemResource?.director_details?.include_occupation,
                includeDobType: itemResource?.director_details?.include_dob_type
            });

            const secretaryDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.secretary_details?.include_basic_information,
                includeAddress: itemResource?.secretary_details?.include_address,
                includeAppointmentDate: itemResource?.secretary_details?.include_appointment_date,
                includeCountryOfResidence: itemResource?.secretary_details?.include_country_of_residence,
                includeNationality: itemResource?.secretary_details?.include_nationality,
                includeOccupation: itemResource?.secretary_details?.include_occupation,
                includeDobType: itemResource?.secretary_details?.include_dob_type
            });

            const memberDetails = CheckoutMapping.mapMemberDetails(itemResource?.member_details);

            const designatedMemberDetails = CheckoutMapping.mapMemberDetails(itemResource?.designated_member_details);

            const registeredOfficeAddressDetails = this.removeEmptyObjects({
                includeAddressRecordsType: itemResource?.registered_office_address_details?.include_address_records_type
            });

            const principalPlaceOfBusinessDetails = this.removeEmptyObjects({
                includeAddressRecordsType: itemResource?.principal_place_of_business_details?.include_address_records_type
            });

            const generalPartnerDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.general_partner_details?.include_basic_information
            });

            const limitedPartnerDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.limited_partner_details?.include_basic_information
            });

            const liquidatorsDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.liquidators_details?.include_basic_information
            });

            const administratorsDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.administrators_details?.include_basic_information
            });

            return {
                certificateType: itemResource.certificate_type,
                companyType: itemResource.company_type,
                deliveryTimescale: itemResource.delivery_timescale,
                deliveryMethod: itemResource.delivery_method,
                designatedMemberDetails: designatedMemberDetails,
                includeGeneralNatureOfBusinessInformation: itemResource.include_general_nature_of_business_information,
                includeGoodStandingInformation: itemResource.include_good_standing_information,
                includeCompanyObjectsInformation: itemResource.include_company_objects_information,
                generalPartnerDetails: generalPartnerDetails,
                limitedPartnerDetails: limitedPartnerDetails,
                memberDetails: memberDetails,
                registeredOfficeAddressDetails: registeredOfficeAddressDetails,
                principalPlaceOfBusinessDetails: principalPlaceOfBusinessDetails,
                secretaryDetails: secretaryDetails,
                directorDetails: directorDetails,
                forename: itemResource.forename,
                surname: itemResource.surname,
                liquidatorsDetails: liquidatorsDetails,
                companyStatus: itemResource.company_status,
                administratorsDetails: administratorsDetails
            }
        } else if (kind === "item#certified-copy") {
            itemResource = itemResource as CertifiedCopyItemOptionsResource;
            return {
                deliveryTimescale: itemResource.delivery_timescale,
                deliveryMethod: itemResource.delivery_method,
                filingHistoryDocuments: itemResource.filing_history_documents.map(f => ({
                    filingHistoryDate: f.filing_history_date,
                    filingHistoryDescription: f.filing_history_description,
                    filingHistoryId: f.filing_history_id,
                    filingHistoryType: f.filing_history_type,
                    filingHistoryDescriptionValues: f.filing_history_description_values,
                    filingHistoryCost: f.filing_history_cost
                }))
            }
        } else {
            itemResource = itemResource as MissingImageDeliveryItemOptionsResource;
            return {
                filingHistoryDate: itemResource.filing_history_date,
                filingHistoryDescription: itemResource.filing_history_description,
                filingHistoryId: itemResource.filing_history_id,
                filingHistoryType: itemResource.filing_history_type,
                filingHistoryDescriptionValues: itemResource.filing_history_description_values
            }
        }
    }

    static mapMemberDetails = (member_details: {
        include_address?: boolean,
        include_appointment_date?: boolean,
        include_basic_information?: boolean,
        include_country_of_residence?: boolean,
        include_dob_type?: string
    }): MemberDetails => {
        return CheckoutMapping.removeEmptyObjects({
            includeAddress: member_details?.include_address,
            includeAppointmentDate: member_details?.include_appointment_date,
            includeBasicInformation: member_details?.include_basic_information,
            includeCountryOfResidence: member_details?.include_country_of_residence,
            includeDobType: member_details?.include_dob_type
        });
    }
}
