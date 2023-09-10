//package com.shakertroop15.server.domain.qbo.customer;
//
//import com.shakertroop15.server.domain.users.User;
//import com.shakertroop15.server.domain.users.UserRepository;
//import com.shakertroop15.server.domain.users.UsersResponse;
//import jakarta.servlet.http.HttpSession;
//import lombok.extern.log4j.Log4j2;
//import org.jetbrains.annotations.NotNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.util.List;
//import java.util.Optional;
//import java.util.function.Function;
//import java.util.stream.Collectors;
//
//@Service
//@Log4j2
//public class CustomerService {
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @Value("${app.qbo.partnerToken}")
//    private String partnerToken;
//
//    @Value("${app.qbo.baseUrl}")
//    private String baseUrl;
//
//    @Value("${app.qbo.companyId}")
//    private String companyId;
//
//    public static final String QBO_USER_TOKEN = "QBO_USER_TOKEN";
//
//
//    public void syncApiCustomersToDatabase(List<QboCustomer> apiCustomers) {
//        var apiMap = apiCustomers.stream().parallel()
//                .collect(Collectors.toMap(QboCustomer::id, Function.identity()));
//
//        apiMap.values()
//                .stream()
//                .forEach(apiCust -> {
//                    var dbUser = customerRepository.findById(apiCust.id()).orElse(apiCust);
//                    boolean annualFee = dbUser.isAnnualFee();
//                    boolean active = dbUser.isActive();
//                    boolean deleted = dbUser.isDeleted();
//                    User.map(apiUser, dbUser);
//                    dbUser.setActive(active);
//                    dbUser.setAnnualFee(annualFee);
//                    dbUser.setDeleted(deleted);
//                    userRepository.save(dbUser);
//                });
//        userRepository.saveAll(
//                userRepository.findAll().stream()
//                        .filter(dbUser -> !apiMap.containsKey(dbUser.getUserId()))
//                        .map(dbUser -> {
//                            dbUser.setDeleted(true);
//                            return dbUser;
//                        })
//                        .collect(Collectors.toList())
//        );
//    }
//}
