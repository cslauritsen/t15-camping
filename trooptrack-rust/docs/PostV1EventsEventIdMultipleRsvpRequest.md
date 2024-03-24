# PostV1EventsEventIdMultipleRsvpRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**event_trackers_left_square_bracket_user_id_right_square_bracket** | **Vec<i32>** | ID of the user for whom you are RSVP'ing. Must be within your scope as a user AND must be invited to the event. | 
**event_trackers_left_square_bracket_status_cd_right_square_bracket** | **Vec<String>** | yes: Coming. no: Not coming. tbd: No clue. | 
**event_trackers_left_square_bracket_number_of_adult_guests_right_square_bracket** | Option<**Vec<i32>**> | How many adult guests will this person bring? | [optional]
**event_trackers_left_square_bracket_number_of_youth_guests_right_square_bracket** | Option<**Vec<i32>**> | How many youth guests will this person bring? | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


