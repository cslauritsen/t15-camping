# \AchievementsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_achievements**](AchievementsApi.md#get_v1_achievements) | **GET** /v1/achievements | 
[**get_v1_achievements_id**](AchievementsApi.md#get_v1_achievements_id) | **GET** /v1/achievements/{id} | 



## get_v1_achievements

> models::AchievementEntity get_v1_achievements(x_partner_token, x_user_token)


Returns a list of available achievements for the member

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**models::AchievementEntity**](AchievementEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_achievements_id

> models::AchievementEntity get_v1_achievements_id(x_partner_token, x_user_token, award_type_id, id)


Returns detailed information about an achievement

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**award_type_id** | **i32** |  | [required] |
**id** | **i32** |  | [required] |

### Return type

[**models::AchievementEntity**](AchievementEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

