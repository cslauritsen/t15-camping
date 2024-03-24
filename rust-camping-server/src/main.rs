use chrono::Datelike;
use dotenv;
use trooptrack_rust::apis::{Error, events_api, tokens_api};
use trooptrack_rust::apis::configuration::Configuration;
use trooptrack_rust::apis::events_api::GetV1EventsError;
use trooptrack_rust::apis::tokens_api::PostV1TokensError;
use trooptrack_rust::models::events_list_entity::EventsListEntity;
use trooptrack_rust::models::token_users_response::TokenUsersResponse;

#[tokio::main]
async fn main() {
    let config = Configuration::new();
    dotenv::dotenv().expect("Failed to read .env file");
    let default_int = 1;

    match dotenv::var("TT_TOKEN") {
        Ok(tok) => {
            println!("Token: {:?}", tok);
            match get_some_events(&config).await {
                Ok(res) => {
                    for event in res.events.unwrap_or(vec![]) {
                        let dt = chrono::DateTime::parse_from_rfc3339(&event.activity_at.unwrap_or("".to_string()))
                            .expect("Failed to parse date");

                        println!("Event: id={}, mo={}/{}/{}, titre={}",
                                 event.event_id.as_ref().unwrap_or(&default_int),
                                 dt.month(), dt.day(), dt.year(),
                                 event.title.as_ref().unwrap_or(&"No title".to_string()),
                        );
                    }
                }
                Err(err) => {
                    println!("Failed to get events: {:?}", err);
                }
            }
        }
        Err(_) => {
            println!("TT_TOKEN not found in .env file, attempting a new login");
            match login(&config).await {
                Ok(res) => {
                    dbg!("Login successful: {:?}", &res);
                    let tok = &res.users.expect("users array should be present")
                        .get(0)
                        .expect("users array should not be empty")
                        .token
                        .as_ref()
                        .expect("token should be present")
                        .clone()
                        ;
                    println!("Token: {:?}", tok);
                }
                Err(err) => {
                    println!("Login failed: {:?}", err);
                }
            }
        }
    }
}

async fn login(config: &Configuration) -> Result<TokenUsersResponse, Error<PostV1TokensError>> {
    dotenv::dotenv().expect("Failed to read .env file");
    let x_partner_token = dotenv::var("TT_PARTNER_TOKEN").expect("TT_PARTNER_TOKEN expected");
    let x_username = dotenv::var("TT_USER_ID").expect("TT_USER_ID expected");
    let x_user_password = dotenv::var("TT_PASSWORD").expect("TT_PASSWORD expected");

    tokens_api::post_v1_tokens(
        &config,
        &x_partner_token,
        &x_username,
        &x_user_password,
    ).await
}

async fn get_some_events(config: &Configuration) -> Result<EventsListEntity, Error<GetV1EventsError>> {
    let x_partner_token = dotenv::var("TT_PARTNER_TOKEN").expect("TT_PARTNER_TOKEN expected");
    let x_user_token = dotenv::var("TT_TOKEN").expect("TT_TOKEN expected");
    events_api::get_v1_events(
        &config,
        &x_partner_token,
        &x_user_token,
        "2023-01-01",
        "2023-12-31",
    ).await
}
