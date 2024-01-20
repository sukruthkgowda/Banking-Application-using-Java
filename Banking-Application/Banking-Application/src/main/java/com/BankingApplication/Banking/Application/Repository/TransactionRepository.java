package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction,Long> {

}
