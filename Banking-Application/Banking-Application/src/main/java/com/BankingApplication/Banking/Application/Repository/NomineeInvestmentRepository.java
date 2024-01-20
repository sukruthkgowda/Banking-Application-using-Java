package com.BankingApplication.Banking.Application.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.BankingApplication.Banking.Application.Model.NomineeInvestment;
import org.springframework.stereotype.Repository;

@Repository
public interface NomineeInvestmentRepository extends MongoRepository<NomineeInvestment,Long> {

}
