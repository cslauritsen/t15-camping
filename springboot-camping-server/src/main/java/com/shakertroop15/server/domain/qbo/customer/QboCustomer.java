package com.shakertroop15.server.domain.qbo.customer;

import com.shakertroop15.server.domain.qbo.address.EmailAddress;
import com.shakertroop15.server.domain.qbo.address.QboAddress;

//{
// "QueryResponse": {
//  "Customer": [
//   {
//    "Taxable": true,
//    "BillAddr": {
//     "Id": "625",
//     "Line1": "3687 Ingleside",
//     "City": "Shaker Hts",
//     "Country": "United States",
//     "CountrySubDivisionCode": "OH",
//     "PostalCode": "44122"
//    },
//    "Notes": "Created from PayPal",
//    "Job": false,
//    "BillWithParent": false,
//    "Balance": 0,
//    "BalanceWithJobs": 0,
//    "CurrencyRef": {
//     "value": "USD",
//     "name": "United States Dollar"
//    },
//    "PreferredDeliveryMethod": "Print",
//    "IsProject": false,
//    "ClientEntityId": "0",
//    "domain": "QBO",
//    "sparse": false,
//    "Id": "277",
//    "SyncToken": "1",
//    "MetaData": {
//     "CreateTime": "2016-03-14T06:02:33-07:00",
//     "LastUpdatedTime": "2022-11-25T08:13:37-08:00"
//    },
//    "GivenName": "Chad",
//    "FamilyName": "Lauritsen",
//    "FullyQualifiedName": "Chad Lauritsen",
//    "DisplayName": "Chad Lauritsen",
//    "PrintOnCheckName": "Chad Lauritsen",
//    "Active": true,
//    "V4IDPseudonym": "0020762702c937a9174c339486e8f37328b906",
//    "PrimaryEmailAddr": {
//     "Address": "csl4jc@gmail.com"
//    },
//    "DefaultTaxCodeRef": {
//     "value": "2"
//    }
//   }
//  ],
//  "startPosition": 1,
//  "maxResults": 1
// },
// "time": "2022-12-28T18:39:40.805-08:00"
//}
public record QboCustomer(
        String id,
        boolean taxable,
        QboAddress billAddr,
        String notes,
        boolean job,
        boolean billWithParent,
        String displayName,
        EmailAddress primaryEmailAddr

) {
}
