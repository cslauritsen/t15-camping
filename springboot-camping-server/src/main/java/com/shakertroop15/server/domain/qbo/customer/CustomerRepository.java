package com.shakertroop15.server.domain.qbo.customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;


public interface CustomerRepository extends MongoRepository<QboCustomer, String> {
    long count();
}
