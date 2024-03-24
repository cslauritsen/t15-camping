# \PhotoAlbumsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_photo_albums**](PhotoAlbumsApi.md#get_v1_photo_albums) | **GET** /v1/photo_albums | 
[**get_v1_photo_albums_id**](PhotoAlbumsApi.md#get_v1_photo_albums_id) | **GET** /v1/photo_albums/{id} | 
[**post_v1_photo_albums_id**](PhotoAlbumsApi.md#post_v1_photo_albums_id) | **POST** /v1/photo_albums/{id} | 



## get_v1_photo_albums

> models::PhotoAlbumEntity get_v1_photo_albums(x_partner_token, x_user_token)


Returns a list of photo albums relevant to the user. Photos are not returned on this endpoint.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**models::PhotoAlbumEntity**](PhotoAlbumEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_photo_albums_id

> models::PhotoAlbumEntity get_v1_photo_albums_id(x_partner_token, x_user_token, id)


Returns detailed information about a photo album, including photos

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **String** |  | [required] |

### Return type

[**models::PhotoAlbumEntity**](PhotoAlbumEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_photo_albums_id

> models::PhotoAlbumEntity post_v1_photo_albums_id(x_partner_token, x_user_token, id, post_v1_photo_albums_id_request)


Upload a new photo to a photo album

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **String** |  | [required] |
**post_v1_photo_albums_id_request** | [**PostV1PhotoAlbumsIdRequest**](PostV1PhotoAlbumsIdRequest.md) |  | [required] |

### Return type

[**models::PhotoAlbumEntity**](PhotoAlbumEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

