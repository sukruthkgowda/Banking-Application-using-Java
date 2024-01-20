package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Beneficiary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.BankingApplication.Banking.Application.Model.Customer;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

//Not sure if it has to ObjectId or CustomerID
@Repository
public interface CustomerRepository extends MongoRepository<Customer, Long> {
    Optional<Customer> findCustomerByCustomerID(long CustomerID);

    Optional<Customer> findCustomerByUsername(String Username);

}
