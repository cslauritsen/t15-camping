package com.shakertroop15.server.domain.events;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("users")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Invitee {
    /*
    {
        "event_tracker_id": 71818324,
            "user_id": 609760,
            "name": "Kurt Koenigsberger",
            "number_of_adult_guests": 0,
            "number_of_youth_guests": 0,
            "rsvp_status": "yes",
            "attended": "yes"
    }
     */
    private Long eventTrackerId;
    private Long userId;
    private String name;
    private Integer numberOfAdultGuests;
    private Integer numberOfYouthGuests;
    private String rsvpStatus;
    private String attended;
}
