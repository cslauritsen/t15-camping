package com.shakertroop15.server.domain.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

public class EventTest {
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void testParse() throws Exception {
        var json = """
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
                    }
                """;
        var event = objectMapper.reader().readValue(json, Event.class);
        assertEquals(1419193, event.getEventId());
        assertEquals(11, event.getActivityAt().getMonthValue());
    }
}