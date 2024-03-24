# \MailingListsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_mailing_lists**](MailingListsApi.md#get_v1_mailing_lists) | **GET** /v1/mailing_lists | 
[**post_v1_mailing_lists_id**](MailingListsApi.md#post_v1_mailing_lists_id) | **POST** /v1/mailing_lists/{id} | 



## get_v1_mailing_lists

> Vec<models::MailingListEntity> get_v1_mailing_lists(x_partner_token, x_user_token)


Returns a list of mailing lists relevant to the user

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**Vec<models::MailingListEntity>**](MailingListEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_mailing_lists_id

> post_v1_mailing_lists_id(x_partner_token, x_user_token, id, post_v1_mailing_lists_id_request)


Post a message to a mailing list

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **String** | The ID of the list you want to post a message to | [required] |
**post_v1_mailing_lists_id_request** | [**PostV1MailingListsIdRequest**](PostV1MailingListsIdRequest.md) |  | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

