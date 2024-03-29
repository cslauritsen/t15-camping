use mongodb::Client;
use mongodb::options::ClientOptions;

#[derive(Debug, Clone)]
pub(crate) struct State {
    pub db: Client,
}

impl State {
    /// Create a new instance of `State`.
    pub(crate) async fn new(uri: &str) -> tide::Result<Self> {

        // let uri = dotenv::var("MONGO_URI").unwrap_or(DEFAULT_URI.to_string());
        let mut client_options = ClientOptions::parse_async(uri).await?;
        // only set credential if password is set
        if let Ok(pass) = dotenv::var("MONGO_PASSWORD") {
            let credential = mongodb::options::Credential::builder()
                .username(dotenv::var("MONGO_USER").unwrap_or("MONGO_USER".to_string()))
                .password(pass)
                .build();
            client_options.credential = Some(credential);
        }
        let client = Client::with_options(client_options)?;
        Ok(Self { db:  client})
    }

    /// Access the mongodb client.
    pub(crate) fn mongo(&self) -> &Client {
        &self.db
    }
}