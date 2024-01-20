package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Beneficiary;
import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Model.Loan;
import com.BankingApplication.Banking.Application.Repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Optional;


@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Long createLoan(String loanType,Double interestRate,Long Term,Long amountRequested,Long CustomerId){

        long lastTimestamp = 0L;
        long counter = 0L;
        long timestamp = System.currentTimeMillis();
        if (timestamp == lastTimestamp) {
            counter++;
        } else {
            lastTimestamp = timestamp;
            counter = new Random().nextLong() % 1000000000L; // Random number between -999999999 and 999999999
        }
        Long id=Math.abs((timestamp * 1000000000L) + counter) % 1000000000L;

        String status = "APPLIED";
        Loan loan = new Loan(id,CustomerId,loanType,interestRate,Term,amountRequested,status);
        Loan res = loanRepository.insert(loan);
        if(res==null){return 0l;}
        return id;
    }
    public List<Long> getLoans(Long customerId){
        Query query = new Query();
        query.addCriteria(Criteria.where("customerID").is(customerId));
        List<Loan> loans = mongoTemplate.find(query, Loan.class);
        List<Long> loanIds = new ArrayList<>();
        for (Loan loan : loans) {
            loanIds.add(loan.getLoanID());
        }
        return  loanIds;
    }

    public List<Loan> getAllLoans(Long customerId){
        Query query = new Query();
        query.addCriteria(Criteria.where("customerID").is(customerId));
        List<Loan> loans = mongoTemplate.find(query, Loan.class);
        return loans;
    }

    public boolean UpdateLoanStatus(Long LoanId,String status){
        mongoTemplate.update(Loan.class)
                .matching(Criteria.where("loanID").is(LoanId))
                .apply(new Update().set("status",status))
                .first();
        return true;
    }
}
