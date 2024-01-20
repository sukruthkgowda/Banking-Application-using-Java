package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Model.Transaction;
import com.BankingApplication.Banking.Application.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Date;
@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public boolean createTransaction(Long fromAccount,Long toAccount,String description,Double Amount){

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

        Date d = new Date();
        Transaction trans = new Transaction(id,d,Amount,description,toAccount,fromAccount,"SUCCESS");
        Transaction res = transactionRepository.insert(trans);
        if(res==null){return false;}
        return true;
    }

    public List<Transaction> allTransactions(Long accountNo){
        Criteria criteria = new Criteria().orOperator(
                Criteria.where("senderAccountNo").is(accountNo),
                Criteria.where("receiveeAccountNo").is(accountNo)
        );
        Query query = new Query(criteria);
        return mongoTemplate.find(query, Transaction.class);
    }
}
