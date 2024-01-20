package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.NomineeLoan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NomineeLoanRepository extends MongoRepository<NomineeLoan,Long> {

}
