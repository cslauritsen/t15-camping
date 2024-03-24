# \YouthsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**post_v1_youths**](YouthsApi.md#post_v1_youths) | **POST** /v1/youths | 



## post_v1_youths

> post_v1_youths(x_partner_token, x_user_token, post_v1_youths_request)


Create a youth

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**post_v1_youths_request** | [**PostV1YouthsRequest**](PostV1YouthsRequest.md) |  | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

