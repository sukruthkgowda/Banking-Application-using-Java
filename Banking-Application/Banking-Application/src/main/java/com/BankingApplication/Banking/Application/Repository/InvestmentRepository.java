package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Investment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestmentRepository extends MongoRepository<Investment, Long> {

}
