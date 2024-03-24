# \AwardTypesApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_award_types**](AwardTypesApi.md#get_v1_award_types) | **GET** /v1/award_types | 
[**get_v1_award_types_id**](AwardTypesApi.md#get_v1_award_types_id) | **GET** /v1/award_types/{id} | 



## get_v1_award_types

> models::AwardTypeEntity get_v1_award_types(x_partner_token, x_user_token)


Returns a list of available award types for the member. Active achievements are not included.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**models::AwardTypeEntity**](AwardTypeEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_award_types_id

> models::AwardTypeEntity get_v1_award_types_id(x_partner_token, x_user_token, id)


Returns active achievements for a given award type.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** |  | [required] |

### Return type

[**models::AwardTypeEntity**](AwardTypeEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

