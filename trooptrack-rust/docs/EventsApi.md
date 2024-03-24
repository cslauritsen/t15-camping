# \EventsApi

All URIs are relative to *http://shakertroop15.trooptrack.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_v1_events**](EventsApi.md#get_v1_events) | **GET** /v1/events | 
[**get_v1_events_id**](EventsApi.md#get_v1_events_id) | **GET** /v1/events/{id} | 
[**get_v1_events_types**](EventsApi.md#get_v1_events_types) | **GET** /v1/events/types | 
[**post_v1_events**](EventsApi.md#post_v1_events) | **POST** /v1/events | 
[**post_v1_events_event_id_attendance**](EventsApi.md#post_v1_events_event_id_attendance) | **POST** /v1/events/{event_id}/attendance | 
[**post_v1_events_event_id_multiple_rsvp**](EventsApi.md#post_v1_events_event_id_multiple_rsvp) | **POST** /v1/events/{event_id}/multiple_rsvp | 
[**put_v1_events_id_rsvp**](EventsApi.md#put_v1_events_id_rsvp) | **PUT** /v1/events/{id}/rsvp | 



## get_v1_events

> models::EventsListEntity get_v1_events(x_partner_token, x_user_token, start_on, end_on)


Returns a list of events for the date range provided

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**start_on** | **String** | an iso8601 date (YYYY-MM-DD) indicating the beginning of the date range to include events | [required] |
**end_on** | **String** | an iso8601 date (YYYY-MM-DD) indicating the end of the date range to include events | [required] |

### Return type

[**models::EventsListEntity**](EventsListEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_events_id

> models::EventDetailsEntity get_v1_events_id(x_partner_token, x_user_token, id)


Returns detailed information about an event

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** |  | [required] |

### Return type

[**models::EventDetailsEntity**](EventDetailsEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_v1_events_types

> models::EventTypeEntity get_v1_events_types(x_partner_token, x_user_token)


Returns event types available for a troop

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |

### Return type

[**models::EventTypeEntity**](EventTypeEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_events

> models::EventDetailsEntity post_v1_events(x_partner_token, x_user_token, post_v1_events_request)


Create an event

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**post_v1_events_request** | [**PostV1EventsRequest**](PostV1EventsRequest.md) |  | [required] |

### Return type

[**models::EventDetailsEntity**](EventDetailsEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_events_event_id_attendance

> models::EventDetailsEntity post_v1_events_event_id_attendance(x_partner_token, x_user_token, event_id, post_v1_events_event_id_attendance_request)


Record attendance at an event

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**event_id** | **i32** |  | [required] |
**post_v1_events_event_id_attendance_request** | [**PostV1EventsEventIdAttendanceRequest**](PostV1EventsEventIdAttendanceRequest.md) |  | [required] |

### Return type

[**models::EventDetailsEntity**](EventDetailsEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## post_v1_events_event_id_multiple_rsvp

> models::EventDetailsEntity post_v1_events_event_id_multiple_rsvp(x_partner_token, x_user_token, event_id, post_v1_events_event_id_multiple_rsvp_request)


Record RSVPs for multiple members to an event

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**event_id** | **i32** |  | [required] |
**post_v1_events_event_id_multiple_rsvp_request** | [**PostV1EventsEventIdMultipleRsvpRequest**](PostV1EventsEventIdMultipleRsvpRequest.md) |  | [required] |

### Return type

[**models::EventDetailsEntity**](EventDetailsEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## put_v1_events_id_rsvp

> models::EventDetailsEntity put_v1_events_id_rsvp(x_partner_token, x_user_token, id, put_v1_events_id_rsvp_request)


RSVP to an event

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**x_partner_token** | **String** | Your secret partner token | [required] |
**x_user_token** | **String** | The token you received when you authenticated the user | [required] |
**id** | **i32** |  | [required] |
**put_v1_events_id_rsvp_request** | [**PutV1EventsIdRsvpRequest**](PutV1EventsIdRsvpRequest.md) |  | [required] |

### Return type

[**models::EventDetailsEntity**](EventDetailsEntity.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

