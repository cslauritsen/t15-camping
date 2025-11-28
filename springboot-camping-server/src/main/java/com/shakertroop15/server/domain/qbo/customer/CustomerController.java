//package com.shakertroop15.server.domain.qbo.customer;
//
//import jakarta.servlet.http.HttpSession;
//import lombok.extern.log4j.Log4j2;
//import org.jetbrains.annotations.NotNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//
//@Log4j2
//public class CustomerController {
//    @Autowired
//    private CustomerRepository customerRepository;
//
//
//    @Value("${app.qbo.baseUrl}")
//    private String baseUrl;
//
//    @Value("${app.qbo.companyId}")
//    private String companyId;
//
//    @Value("${app.qbo.clientId}")
//    private String clientId;
//
//    @Value("${app.qbo.clientSecret}")
//    private String clientSecret;
//
//    public static final String QBO_USER_TOKEN = "QBO_USER_TOKEN";
//
//
////
////    @PostMapping("/users/sync")
////    public ResponseEntity<UserSyncStatus> syncUsers(HttpSession session) {
////        var status = new UserSyncStatus();
////        status.setSuccess(false);
////        var resp = getUsersResponse(session);
////        if (resp.getStatusCode() == HttpStatus.OK) {
////            userService.syncApiUsersToDatabase(resp.getBody().getUsers());
////            status.setSuccess(true);
////            status.setMessage("Users synchronized successfully");
////            return ResponseEntity.ok(status);
////        }
////        status.setMessage("Failed to synchronize users");
////        return ResponseEntity.status(resp.getStatusCode()).body(status);
////    }
//
//
//    @NotNull
//    private ResponseEntity<QboCustomerResponse> getCustomerResponse(HttpSession session, String email) {
//        if (session.getAttribute(QBO_USER_TOKEN) instanceof String userToken) {
//            var query = encode("select * from Customer Where primaryemailaddr = 'csl4jc@gmail.com'");
//            var client = WebClient.create();
//            var response = client.get()
//                    .uri(baseUrl + "GET /v3/company/" + companyId + "/query?query=" + query + "&minorversion=65")
////                    .header("X-Partner-Token", partnerToken)
////                    .header("X-User-Token", userToken)
//                    .accept(MediaType.APPLICATION_JSON)
//                    .retrieve()
//                    .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
//                        log.error("Error getting users: {}", clientResponse.statusCode());
//                        return clientResponse.createException();
//                    })
//                    .bodyToMono(QboCustomerResponse.class)
//                    .block();
//            return ResponseEntity.ok(response);
//        }
//        return ResponseEntity.status(401).build();
//    }
//
//    private String encode(String str) {
//        try {
//            return URLEncoder.encode(str, StandardCharsets.UTF_8.toString());
//        } catch (UnsupportedEncodingException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//
//}
