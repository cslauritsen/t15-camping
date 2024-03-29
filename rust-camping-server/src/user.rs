
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
// #[serde(rename_all = "camelCase")]
/// Represents a user in the TroopTrack system, with our custom extensions.
struct User {
    user_id: Option<i32>,
    first_name: Option<String>,
    last_name: Option<String>,
    middle_name: Option<String>,
    email: Option<String>,
    cell_phone: Option<String>,
    home_phone: Option<String>,
    work_phone: Option<String>,
    gender: Option<String>,
    scout: Option<bool>,
    employer: Option<String>,
    occupation: Option<String>,
    marital_status: Option<String>,
    current_position: Option<String>,
    current_rank: Option<String>,
    current_rank_tracker: Option<String>,
    current_rank_tracker_percent_complete: Option<u8>,
    avatar: Option<String>,
    patrol: Option<String>,
    //    patrolId: Long,
    troop_number: Option<String>,
    born_on: Option<String>,

    // Troop-15-specific fields
    /// If scout is true and annual_fee is true, then do not bill on a per-campout basis
    annual_fee: Option<bool>,
    /// If the scout is not active, they can be filtered from certain views
    active: Option<bool>,
    /// If the scout is deleted, they should not appear in any views
    deleted: Option<bool>,
    patrol_id: Option<Vec<i32>>,
}

impl Default for User {
    fn default() -> Self {
        Self {
            user_id: None,
            first_name: None,
            last_name: None,
            middle_name: None,
            email: None,
            cell_phone: None,
            home_phone: None,
            work_phone: None,
            gender: None,
            scout: None,
            employer: None,
            occupation: None,
            marital_status: None,
            current_position: None,
            current_rank: None,
            current_rank_tracker: None,
            current_rank_tracker_percent_complete: None,
            avatar: None,
            patrol: None,
            troop_number: None,
            born_on: None,
            annual_fee: None,
            active: Some(true),
            deleted: None,
            patrol_id: None,
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn defaults_are_set() {
        let user = super::User::default();
        assert_eq!(user.active.expect("default value for 'active' should be true"), true);
    }

    #[test]
    fn basic_to_json() {
        let user = super::User {
            first_name: Some(String::from("John")),
            last_name: Some(String::from("Doe")),
            ..Default::default()
        };
        let user3 = super::User {
            first_name: Some(String::from("John")),
            last_name: Some(String::from("Roe")),
            ..Default::default()
        };

        let json = serde_json::to_string(&user).expect("Failed to serialize User");
        let user2 = serde_json::from_str(&json).expect("Failed to deserialize User");
        assert_eq!(user, user2);
        assert_ne!(user, user3);
    }

    #[test]
    fn deser_chad() {
        let chad_json = r#"
                {
                  "user_id": 1234,
                  "first_name": "User",
                  "middle_name": "S",
                  "last_name": "One",
                  "email": "userone@gmail.com",
                  "cell_phone": "(333) 555-1212",
                  "home_phone": "",
                  "work_phone": "",
                  "gender": "M",
                  "scout": false,
                  "employer": "",
                  "occupation": "",
                  "marital_status": "",
                  "current_position": "Committee Member",
                  "current_rank": "Scout",
                  "current_rank_tracker": "Scout (2016)",
                  "current_rank_tracker_percent_complete": 13,
                  "avatar": "https://styles.trooptrack.com/users/609761/avatar/thumb/x.jpg",
                  "patrol": "15B Adults, 15G Adults, Committee",
                  "patrol_id": [
                    76175,
                    93473,
                    90235
                  ],
                  "troop_number": "15",
                  "born_on": ""
                }
            "#;

        let chad: super::User = serde_json::from_str(chad_json).expect("Failed to deserialize Chad");
        assert_eq!(chad.user_id, Some(1234));
        assert_eq!(chad.current_rank_tracker_percent_complete, Some(13));
        assert_eq!(chad.current_position, Some(String::from("Committee Member")));
        assert_eq!(chad.patrol_id, Some(vec![76175, 93473, 90235]));
    }

    #[test]
    fn test_cloning() {
        let user = super::User {
            first_name: Some(String::from("John")),
            last_name: Some(String::from("Doe")),
            ..Default::default()
        };
        let user2 = user.clone();
        assert_eq!(user, user2);
        assert!(user2.user_id.is_none());
        assert!(user2.active.unwrap());
    }
}