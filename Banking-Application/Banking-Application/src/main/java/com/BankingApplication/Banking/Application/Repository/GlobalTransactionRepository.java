package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.GlobalTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalTransactionRepository extends MongoRepository<GlobalTransaction,Long> {

}
