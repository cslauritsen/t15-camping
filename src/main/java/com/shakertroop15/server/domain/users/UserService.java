package com.shakertroop15.server.domain.users;

import org.apache.catalina.realm.UserDatabaseRealm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Value("${app.troopTrack.partnerToken}")
    private String partnerToken;

    @Value("${app.troopTrack.baseUrl}")
    private String baseUrl;

    public void syncApiUsersToDatabase(List<User> apiUsers) {
        var apiMap = apiUsers.stream().parallel()
                .collect(Collectors.toMap(User::getUserId, Function.identity()));

        apiMap.values()
                .stream()
                .forEach(apiUser -> {
                    var dbUser = userRepository.findByUserId(apiUser.getUserId()).orElse(apiUser);
                    boolean annualFee = dbUser.isAnnualFee();
                    boolean active = dbUser.isActive();
                    boolean deleted = dbUser.isDeleted();
                    User.map(apiUser, dbUser);
                    dbUser.setActive(active);
                    dbUser.setAnnualFee(annualFee);
                    dbUser.setDeleted(deleted);
                    userRepository.save(dbUser);
                });
        userRepository.saveAll(
                userRepository.findAll().stream()
                        .filter(dbUser -> !apiMap.containsKey(dbUser.getUserId()))
                        .map(dbUser -> {
                            dbUser.setDeleted(true);
                            return dbUser;
                        })
                        .collect(Collectors.toList())
        );
    }
}
