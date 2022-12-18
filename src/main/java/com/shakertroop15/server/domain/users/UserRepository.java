package com.shakertroop15.server.domain.users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{userId: ?0}")
    Optional<User> findByUserId(String userId);

    long count();
}
