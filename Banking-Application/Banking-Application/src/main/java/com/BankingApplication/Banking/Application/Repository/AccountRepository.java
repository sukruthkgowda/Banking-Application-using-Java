package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Account;
import com.BankingApplication.Banking.Application.Model.Customer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, Long> {
    Optional<Account> findAccountByAccountNo(long AccountNo);
    Optional<Account> findAccountByCustomerId(long CustomerId);
}
