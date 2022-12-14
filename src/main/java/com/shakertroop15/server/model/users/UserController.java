package com.shakertroop15.server.model.users;

import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Controller
public class UserController {

    public static final String USERS_RESPONSE = "USERS_RESPONSE";
    public static final String USER_TOKEN = "USER_TOKEN";
    @Value("${app.troopTrack.partnerToken}")
    private String partnerToken;

    @Value("${app.troopTrack.baseUrl}")
    private String baseUrl;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user/login")
    public ResponseEntity<TokenResponse> login(HttpSession session, @RequestParam String login, @RequestParam String password) {
        var client = WebClient.create();
        var response = client.post()
                .uri(baseUrl + "/tokens")
                .header("X-Partner-Token", partnerToken)
                .header("X-Username", login)
                .header("X-User-Password", password)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .toEntity(TokenResponse.class)
                .block();

        var tokenResponse = response.getBody();
        var privs = tokenResponse.getUsers().stream().findFirst().map(
                u -> u.getPrivileges().stream().collect(Collectors.joining(", "))
        ).orElse("wooga");

        var userTok = tokenResponse.getUsers()
                .stream()
                .findFirst()
                .map(u -> u.getToken())
                .orElseThrow();

        log.info("User {} logged in with privileges {}", login, privs);

        session.setAttribute(USER_TOKEN, userTok);

        return response;
    }

    private boolean isEmpty(Object o) {
        if (o instanceof String s) {
            return s.isEmpty();
        }
        return o == null;
    }

    @GetMapping("/users")
    public ResponseEntity<UsersResponse> getAllUsers(HttpSession session) {
        if (session.getAttribute(USER_TOKEN) instanceof String userToken) {
            var ur = Optional.ofNullable(session.getAttribute(USERS_RESPONSE))
                    .map(obj -> (UsersResponse) obj)
                    .orElseGet(() -> {
                        var client = WebClient.create();
                        var response = client.get()
                                .uri(baseUrl + "/users")
                                .header("X-Partner-Token", partnerToken)
                                .header("X-User-Token", userToken)
                                .accept(MediaType.APPLICATION_JSON)
                                .retrieve()
                                .toEntity(UsersResponse.class)
                                .block();
                        var body = response.getBody();
                        session.setAttribute(USERS_RESPONSE, body);
                        return response.getBody();
                    });
            return ResponseEntity.ok(ur);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/user/{ttid}")
    public @ResponseBody
    ResponseEntity<User> findUserByTtid(@PathVariable Long ttid) {
        WebClient client = WebClient.create();
        val res = userRepository.findByTtid(ttid);
        return res
                .map(u -> ResponseEntity.ok(u))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user")
    public @ResponseBody
    ResponseEntity<User> updateUserByTtid(@RequestBody User user) {

        val res = userRepository.findByTtid(user.getTtid());
        res.ifPresent(u -> {
            u.setAnnualFee(user.getAnnualFee());
            userRepository.save(u);
        });
        return res
                .map(u -> ResponseEntity.ok(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
