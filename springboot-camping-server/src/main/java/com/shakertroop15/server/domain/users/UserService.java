package com.shakertroop15.server.domain.users;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
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
                .forEach(apiUser -> {
                    val dbUser = userRepository.findById(apiUser.getUserId()).orElse(apiUser);
                    val annualFee = dbUser.isAnnualFee();
                    val active = dbUser.isActive();
                    val deleted = dbUser.isDeleted();
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
