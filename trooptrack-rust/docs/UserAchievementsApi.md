# \UserAchievementsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_user_achievements**](UserAchievementsApi.md#get_v1_user_achievements) | **GET** /v1/user_achievements | 
[**get_v1_user_achievements_id**](UserAchievementsApi.md#get_v1_user_achievements_id) | **GET** /v1/user_achievements/{id} | 
[**get_v1_user_achievements_parameters**](UserAchievementsApi.md#get_v1_user_achievements_parameters) | **GET** /v1/user_achievements/parameters | 
[**post_v1_user_achievements_id**](UserAchievementsApi.md#post_v1_user_achievements_id) | **POST** /v1/user_achievements/{id} | 



## get_v1_user_achievements

> get_v1_user_achievements(x_partner_token, x_user_token, award_type_id, user_id, patrol_id, achievement_id)


Returns a list of achievements earned by users based on query parameters.               Query parameters can be combined as desired.               Award type id is required if achievement id is provided

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**award_type_id** | Option<**i32**> |  |  |
**user_id** | Option<**i32**> |  |  |
**patrol_id** | Option<**i32**> |  |  |
**achievement_id** | Option<**i32**> |  |  |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_user_achievements_id

> get_v1_user_achievements_id(x_partner_token, x_user_token, award_type_id, id)


Returns achievment details, including requirements, for a given achievement

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**award_type_id** | **i32** | Id of the Award Type for the achievement being updated | [required] |
**id** | **i32** | Id of the achievement being updated | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_user_achievements_parameters

> get_v1_user_achievements_parameters(x_partner_token, x_user_token)


Returns a list of possible values to be used in querying

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


## post_v1_user_achievements_id

> post_v1_user_achievements_id(x_partner_token, x_user_token, id, post_v1_user_achievements_id_request)


Update achievment details, including requirements, for a given achievement

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** | Id of the user achievement being updated | [required] |
**post_v1_user_achievements_id_request** | [**PostV1UserAchievementsIdRequest**](PostV1UserAchievementsIdRequest.md) |  | [required] |

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

