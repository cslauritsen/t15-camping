# PostV1EventsRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**event_left_square_bracket_title_right_square_bracket** | **String** |  | 
**event_left_square_bracket_event_type_id_right_square_bracket** | **String** | ID of an event type returned by the events/available_types API | 
**event_left_square_bracket_start_at_right_square_bracket** | **String** | Format: YYYY-MM-DDTHH:MM-0600 i.e. 2015-07-04T13:00-0600 | 
**event_left_square_bracket_end_at_right_square_bracket** | Option<**String**> | Format: YYYY-MM-DDTHH:MM-0600 i.e. 2015-07-04T13:00-0600 | [optional]
**event_left_square_bracket_location_right_square_bracket** | Option<**String**> |  | [optional]
**event_left_square_bracket_description_right_square_bracket** | **String** |  | 
**event_left_square_bracket_inviteable_tokens_right_square_bracket** | Option<**String**> | An array of strings describing who to invite. Each token must include the class and ID of the Troop, Patrol, or User to invite.               For example, to invite the whole troop, you would provide ['Troop-1211'], or to invite patrol 11911 and user 1223 and user 3344 then you would               provide ['Patrol-11911', 'User-1223', 'User-3344'] | [optional]
**event_left_square_bracket_camping_nights_right_square_bracket** | Option<**String**> | How many nights do you expect to camp? | [optional]
**event_left_square_bracket_hiking_miles_right_square_bracket** | Option<**String**> | Expected number of miles to be hiked | [optional]
**event_left_square_bracket_canoeing_miles_right_square_bracket** | Option<**String**> | Expected number of miles to be traveled by canoe | [optional]
**event_left_square_bracket_dues_right_square_bracket** | Option<**String**> | Fee for youth to attend | [optional]
**event_left_square_bracket_adult_fee_right_square_bracket** | Option<**String**> | Fee for adults to attend | [optional]
**event_left_square_bracket_rsvp_deadline_right_square_bracket** | Option<**String**> |  | [optional]
**event_left_square_bracket_send_invites_when_right_square_bracket** | Option<**String**> | Number of days before the event to send an invitation. Use 999 to indicate sending the invite immediately. | [optional]
**event_left_square_bracket_send_reminder_when_right_square_bracket** | Option<**String**> | Number of days before the event to send a reminder. | [optional]
**event_left_square_bracket_service_hours_right_square_bracket** | Option<**String**> | Number of service hours expected to be completed | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


