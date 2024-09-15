package com.shakertroop15.server.domain.users;

import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import lombok.val;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Controller
@Data
public class UserController {

    public static final String USERS_RESPONSE = "USERS_RESPONSE";
    public static final String USER_TOKEN = "USER_TOKEN";
    @Value("${app.troopTrack.partnerToken}")
    private String partnerToken;

    @Value("${app.troopTrack.baseUrl}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, WebClient client) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.client = client;
    }



    final WebClient client;

    @PostMapping("/user/login")
    public ResponseEntity<TokenResponse> login(
            HttpSession session,
            @RequestParam String login,
            @RequestParam String password) {

        var tokenResponse = client.post()
                .uri(baseUrl + "/tokens")
                .header("X-Partner-Token", partnerToken)
                .header("X-Username", login)
                .header("X-User-Password", password)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                    log.error("Error logging in: " + clientResponse.statusCode());
                    return clientResponse.createException();
                })
                .bodyToMono(TokenResponse.class)
                .block();

        var privs = new ArrayList<String>();
        Optional.ofNullable(tokenResponse)
                .map(TokenResponse::getUsers)
                .flatMap(users -> users.stream().findFirst())
                .ifPresent(u -> {
                    privs.addAll(u.getPrivileges());
                    session.setAttribute(USER_TOKEN, u.getToken());
                });
        log.info("User {} logged in with privileges {}", login, privs);
        return ResponseEntity.ok(tokenResponse);
    }

    @GetMapping("/users")
    public ResponseEntity<UsersResponse> getAllUsers(HttpSession session) {
        var ur = new UsersResponse();
        ur.setUsers(userRepository.findAll()
                .stream()
                .filter(u -> !u.isDeleted())
                .collect(Collectors.toList()));
        return ResponseEntity.ok(ur);
    }

    @PostMapping("/users/sync")
    public ResponseEntity<UserSyncStatus> syncUsers(HttpSession session) {
        var status = new UserSyncStatus();
        status.setSuccess(false);
        var resp = getUsersResponse(session);
        if (resp.getStatusCode() == HttpStatus.OK) {
            userService.syncApiUsersToDatabase(resp.getBody().getUsers());
            status.setSuccess(true);
            status.setMessage("Users synchronized successfully");
            return ResponseEntity.ok(status);
        }
        status.setMessage("Failed to synchronize users");
        return ResponseEntity.status(resp.getStatusCode()).body(status);
    }

    @NotNull
    private ResponseEntity<UsersResponse> getUsersResponse(HttpSession session) {
        if (session.getAttribute(USER_TOKEN) instanceof String userToken) {
            var ur = Optional.<Object>ofNullable(session.getAttribute(USERS_RESPONSE))
                    .map(UsersResponse.class::cast)
                    .orElseGet(() -> {
                        var client = WebClient.create();
                        var response = client.get()
                                .uri(baseUrl + "/users")
                                .header("X-Partner-Token", partnerToken)
                                .header("X-User-Token", userToken)
                                .accept(MediaType.APPLICATION_JSON)
                                .retrieve()
                                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                                    log.error("Error getting users: {}", clientResponse.statusCode());
                                    return clientResponse.createException();
                                })
                                .bodyToMono(UsersResponse.class)
                                .block();
                        session.setAttribute(USERS_RESPONSE, response);
                        return response;
                    });
            return ResponseEntity.ok(ur);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/user/{userId}")
    public @ResponseBody
    ResponseEntity<User> findUserByUserId(@PathVariable String userId) {
        WebClient client = WebClient.create();
        val res = userRepository.findById(userId);
        return res
                .map(u -> ResponseEntity.ok(u))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user")
    public @ResponseBody
    ResponseEntity<User> updateUserByTtid(@RequestBody User user) {
        val res = userRepository.findById(user.getUserId());
        res.ifPresent(u -> {
            u.setAnnualFee(user.isAnnualFee());
            userRepository.save(u);
        });
        return res
                .map(u -> ResponseEntity.ok(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user/{userId}/custom")
    public @ResponseBody
    ResponseEntity<User> setCustom(
            HttpSession session,
            @PathVariable String userId,
            @RequestParam Map<String, String> allParams) {
        if (session.getAttribute(USER_TOKEN) instanceof String userToken) {
            val res = userRepository.findById(userId);
            if (res.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            var user = res.get();
            if (allParams.containsKey("annualFee")) {
                user.setAnnualFee(Boolean.parseBoolean(allParams.get("annualFee")));
            }
            if (allParams.containsKey("active")) {
                user.setActive(Boolean.parseBoolean(allParams.get("active")));
            }
            if (allParams.containsKey("deleted")) {
                user.setActive(Boolean.parseBoolean(allParams.get("deleted")));
            }
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/user/logout")
    public ResponseEntity<UserStatus> logout(HttpSession session) {
        session.invalidate();
        var status = new UserStatus();
        status.setSuccess(true);
        status.setMessage("User logged out");
        return ResponseEntity.ok(status);
    }
}
