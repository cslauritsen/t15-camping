package com.shakertroop15.server.domain.events;

import com.shakertroop15.server.domain.users.UserController;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.Optional;

@RequestMapping("/api/v1")
@Log4j2
@Controller
public class EventController {
    @Value("${app.troopTrack.partnerToken}")
    private String partnerToken;

    @Value("${app.troopTrack.baseUrl}")
    private String baseUrl;

    private final RestClient restClient;

    @Autowired
    public EventController(RestClient restClient) {
        this.restClient = restClient;
    }

    @GetMapping("/events")
    public ResponseEntity<EventsResponse> getEvents(
            HttpSession session,
            @RequestParam LocalDate start,
            @RequestParam Optional<LocalDate> end) {
        if (session.getAttribute(UserController.USER_TOKEN) instanceof String userToken) {
            var response = restClient.get()
                    .uri(baseUrl + "/events?start_on=" + start + "&end_on=" + end.orElse(start.plusDays(90)))
                    .header("X-Partner-Token", partnerToken)
                    .header("X-User-Token", userToken)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .toEntity(EventsResponse.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).build();
            }
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> getEvent(HttpSession session, @PathVariable Long eventId) {
        if (session.getAttribute(UserController.USER_TOKEN) instanceof String userToken) {
            var response = restClient.get()
                    .uri(baseUrl + "/events/" + eventId)
                    .header("X-Partner-Token", partnerToken)
                    .header("X-User-Token", userToken)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .toEntity(EventResponse.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).build();
            }
        }
        return ResponseEntity.status(401).build();
    }

}
