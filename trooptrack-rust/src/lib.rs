#![allow(unused_imports)]

extern crate reqwest;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate url;

pub mod apis;
pub mod models;

#[cfg(test)]
mod tests {
    // use crate::apis::default_api;

    use crate::models;
    use chrono::{Datelike, DateTime};

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    // #[test]
    // fn test_get_v1_events() {
    //     let config = Configuration::new();
    //     let api = default_api::DefaultApi::new(config);
    //
    //     let result = api.get_v1_events().unwrap();
    //     println!("{:?}", result);
    // }

    #[test]
    fn load_event() {
        let json = r#"
        {
            "event_id": 1,
            "title": "Event Title",
            "event_type": "Event Type",
            "location": "Event Location",
            "activity_at": "2021-01-01T00:00:00.000-06:00",
            "end_at": "2021-01-01T00:00:00.000-06:00",
            "description": "Event Description",
            "vcal": "Event VCAL",
            "rsvp_deadline": "2021-01-01T00:00:00.000-06:00",
            "payment_required_to_rsvp": "false",
            "is_registration_closed?": "false",
            "adult_fee": "Event Adult Fee",
            "dues": "Event Dues",
            "camping_nights": "Event Camping Nights",
            "hiking_miles": "Event Hiking Miles",
            "service_hours": "Event Service Hours",
            "canoeing_miles": "Event Canoeing Miles"
        }
        "#;

        let event: models::EventDetailsEntity = serde_json::from_str(json).unwrap();
        assert_eq!(event.event_id, Some(1));
        assert_eq!(event.title, Some("Event Title".to_string()));
        assert_eq!(event.event_type, Some("Event Type".to_string()));
        assert_eq!(event.location, Some("Event Location".to_string()));
        assert_eq!(event.activity_at, Some("2021-01-01T00:00:00.000-06:00".to_string()));
        let activity_datetime = DateTime::parse_from_rfc3339(&event.activity_at.unwrap()).unwrap();
        assert_eq!(activity_datetime.year(), 2021);
        assert_eq!(activity_datetime.month(), 1);
        assert_eq!(activity_datetime.day(), 1);

        assert_eq!(event.end_at, Some("2021-01-01T00:00:00.000-06:00".to_string()));
        assert_eq!(event.description, Some("Event Description".to_string()));
        assert_eq!(event.vcal, Some("Event VCAL".to_string()));
        assert_eq!(event.rsvp_deadline, Some("2021-01-01T00:00:00.000-06:00".to_string()));
        assert_eq!(event.payment_required_to_rsvp, Some("false".to_string()));
        assert_eq!(event.is_registration_closed, Some("false".to_string()));
        assert_eq!(event.adult_fee, Some("Event Adult Fee".to_string()));
        assert_eq!(event.dues, Some("Event Dues".to_string()));
        assert_eq!(event.camping_nights, Some("Event Camping Nights".to_string()));
        assert_eq!(event.hiking_miles, Some("Event Hiking Miles".to_string()));
        assert_eq!(event.service_hours, Some("Event Service Hours".to_string()));
        assert_eq!(event.canoeing_miles, Some("Event Canoeing Miles".to_string()));

    }
}
