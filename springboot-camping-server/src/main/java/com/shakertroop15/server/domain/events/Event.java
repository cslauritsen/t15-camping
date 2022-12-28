package com.shakertroop15.server.domain.events;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

/*
"events": [
    {
      "event_id": 1419193,
      "title": "15G Weekly Meeting",
      "event_type": "Meeting",
      "activity_at": "2022-11-03T16:00:00.000-07:00",
      "end_at": "2022-11-03T17:30:00.000-07:00",
      "location": "Plymouth Church, 2860 Coventry Road,Shaker Heights,OH,44120",
      "color": "purple",
      "text_color": "white",
      "is_registration_closed?": false,
      "payment_required_to_rsvp": false
    },
 */
@Data
@Document("events")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Event {
    private Long eventId;
    private String title;
    private String eventType;
    private OffsetDateTime activityAt;
    private OffsetDateTime endAt;
    private String location;
    private String color;
    private String textColor;
    // includes a question mark in the json name
    // fucking dumbasses
//    private Boolean isRegistrationClosed;
    private Boolean paymentRequiredToRsvp;
    private String description;
    private LocalDate rsvpDeadline;
    private Boolean guestsAllowed;
    private BigDecimal adultFee;
    private BigDecimal dues;
    private Integer campingNights;
    private BigDecimal hikingMiles;
    private BigDecimal serviceHours;
    private BigDecimal canoeingMiles;
}
/*
"payment_required_to_rsvp": false,
    "is_registration_closed?": true,
    "adult_fee": "0.00",
    "dues": "0.00",
    "camping_nights": 2,
    "hiking_miles": 0,
    "service_hours": 0,
    "canoeing_miles": 0

 */
