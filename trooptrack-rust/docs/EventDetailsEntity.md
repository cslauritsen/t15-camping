# EventDetailsEntity

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**event_id** | Option<**i32**> | ID of the event record | [optional]
**title** | Option<**String**> | Title of the event | [optional]
**event_type** | Option<**String**> | Type of the event (Campout, Hike, Meeting, etc) | [optional]
**location** | Option<**String**> | Location | [optional]
**activity_at** | Option<**String**> | Start time of the event in 2014-11-20T02:00:00.000-06:00 format | [optional]
**end_at** | Option<**String**> | End time of the event in 2014-11-20T02:00:00.000-06:00 format | [optional]
**description** | Option<**String**> | Description of the event | [optional]
**vcal** | Option<**String**> | VCAL representation of the event | [optional]
**rsvp_deadline** | Option<**String**> | Date by which RSVPs must be submitted | [optional]
**guests_allowed** | Option<**String**> | Indicates whether guests are allowed | [optional]
**payment_required_to_rsvp** | Option<**String**> | Indicates if payment is required to RSVP for this event. You cannot RSVP through the API if this is true. | [optional]
**is_registration_closed_question_mark** | Option<**String**> | Indicates if registration for this event is closed. | [optional]
**adult_fee** | Option<**String**> | Event fees required for each adult attending | [optional]
**dues** | Option<**String**> | Event fees required for each youth attending | [optional]
**camping_nights** | Option<**String**> | Number of nights of camping that will occur at this event | [optional]
**hiking_miles** | Option<**String**> | Number of hiking miles that will occur at this event | [optional]
**service_hours** | Option<**String**> | Number of service hours per attendee that will occur at this event | [optional]
**canoeing_miles** | Option<**String**> | Number of canoeing miles that will occur at this event | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


