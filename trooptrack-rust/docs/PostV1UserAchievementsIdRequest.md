# PostV1UserAchievementsIdRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**award_type_id** | **i32** | Id of the Award Type for the achievement being updated | 
**achievement_left_square_bracket_completed_on_right_square_bracket** | Option<**String**> | Date the achievement was completed in YYYY-MM-DD format | [optional]
**achievement_left_square_bracket_award_card_front_image_content_right_square_bracket** | Option<**String**> | Base 64 encoded image content of the front of an award card for the achievement. Currently ignored unless the achievement is a BSA Merit Badge. | [optional]
**achievement_left_square_bracket_award_card_images_type_right_square_bracket** | Option<**String**> | File extension of the award card images - must be the same type for the front and back, if included. Currently ignored unless the achievement is a BSA Merit Badge. | [optional]
**achievement_left_square_bracket_award_card_back_image_content_right_square_bracket** | Option<**String**> | Base 64 encoded image content of the back of an award card for the achievement. Currently ignored unless the achievement is a BSA Merit Badge. | [optional]
**achievement_left_square_bracket_children_right_square_bracket_left_square_bracket_id_right_square_bracket** | **Vec<i32>** | Id of the requirement to be updated | 
**achievement_left_square_bracket_children_right_square_bracket_left_square_bracket_completed_on_right_square_bracket** | **Vec<String>** | Date the requirement was completed in YYYY-MM-DD format | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


