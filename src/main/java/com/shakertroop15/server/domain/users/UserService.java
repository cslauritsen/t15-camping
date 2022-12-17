package com.shakertroop15.server.domain.users;

import org.apache.catalina.realm.UserDatabaseRealm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

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

    public Map<Long, User> syncUsers(UsersResponse usersResponse) {
        var client = WebClient.create();
        var apiMap = usersResponse
                .getUsers()
                .stream()
                .parallel()
                .collect(Collectors.toMap(User::getTtid, Function.identity()));
        var dbMap = userRepository
                .findAll()
                .stream()
                .parallel()
                .collect(Collectors.toMap(User::getTtid, Function.identity()));
        dbMap
                .values()
                .stream()
                .parallel()
                .map(u -> apiMap.computeIfPresent(u.getTtid(), (k, v) -> {
                    v.setActive(u.getActive());
                    v.setAnnualFee(u.getAnnualFee());
                    return v;
                }))
                .collect(Collectors.toMap(User::getTtid, Function.identity()));

        // add to the dbmap any users that are in the apiMap but not in the dbMap
        // synchronize values from the dbMap to the apiMap
        apiMap
                .values()
                .stream()
                .parallel()
                .map(u ->
                        {
                            var dbUser = dbMap.computeIfAbsent(u.getTtid(), (k) -> {
                                u.setActive(true);
                                u.setAnnualFee(false);
                                return u;
                            });
                            u.setAnnualFee(dbUser.getAnnualFee());
                            u.setActive(dbUser.getActive());
                            return u;
                        }
                );

        // save all the users
        userRepository.saveAll(apiMap.values());

        return apiMap;
    }
}
