package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Model.Loan;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface LoanRepository extends MongoRepository<Loan, Long> {

//    Optional<List<Loan>> findLoanByCustomerID(long customerID);
}
