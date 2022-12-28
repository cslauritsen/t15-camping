package com.shakertroop15.server.domain.events;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EventsResponse {
    private List<Event> events = new ArrayList<>();
}
