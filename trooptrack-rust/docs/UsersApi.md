# \UsersApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_users**](UsersApi.md#get_v1_users) | **GET** /v1/users | 
[**get_v1_users_id**](UsersApi.md#get_v1_users_id) | **GET** /v1/users/{id} | 
[**post_v1_users_id**](UsersApi.md#post_v1_users_id) | **POST** /v1/users/{id} | 



## get_v1_users

> get_v1_users(x_partner_token, x_user_token)


Returns a list of users

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_users_id

> get_v1_users_id(x_partner_token, x_user_token, id)


Returns detailed information about a user

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** |  | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_users_id

> post_v1_users_id(x_partner_token, x_user_token, id, post_v1_users_id_request)


Update detailed information about a user

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** |  | [required] |
**post_v1_users_id_request** | Option<[**PostV1UsersIdRequest**](PostV1UsersIdRequest.md)> |  |  |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

