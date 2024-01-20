package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Investment;
import com.BankingApplication.Banking.Application.Model.Loan;
import com.BankingApplication.Banking.Application.Model.Transaction;
import com.BankingApplication.Banking.Application.Repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {
    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Investment> investmentTransactions(Long customerId){
        Query query = new Query();
        query.addCriteria(Criteria.where("customerID").is(customerId));
        List<Investment> investments = mongoTemplate.find(query, Investment.class);
        return investments;
    }
}
