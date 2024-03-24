# \TokensApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_tokens**](TokensApi.md#get_v1_tokens) | **GET** /v1/tokens | 
[**get_v1_tokens_my_basic_info**](TokensApi.md#get_v1_tokens_my_basic_info) | **GET** /v1/tokens/my_basic_info | 
[**post_v1_tokens**](TokensApi.md#post_v1_tokens) | **POST** /v1/tokens | 



## get_v1_tokens

> models::UserPrivilegesEntity get_v1_tokens(x_partner_token, x_user_token)


Returns detailed information about a user's privileges

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**models::UserPrivilegesEntity**](UserPrivilegesEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_tokens_my_basic_info

> get_v1_tokens_my_basic_info()


### Parameters

This endpoint does not need any parameter.

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_tokens

> models::TokenUsersResponse post_v1_tokens(x_partner_token, x_username, x_user_password)


Gets authentication and privilege information for a user account

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_username** | **String** | TroopTrack user name | [required] |
**x_user_password** | **String** | Password of the user | [required] |

### Return type

[**models::TokenUsersResponse**](TokenUsersResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

