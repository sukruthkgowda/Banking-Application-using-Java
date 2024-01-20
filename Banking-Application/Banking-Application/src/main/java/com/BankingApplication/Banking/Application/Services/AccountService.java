package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Account;
import com.BankingApplication.Banking.Application.Model.Beneficiary;
import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;

import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Account> allAccounts(){
        return accountRepository.findAll();
    }

    public Optional<Account> singleAccount(long AccountNo){
        return accountRepository.findAccountByAccountNo(AccountNo);
    }

    public boolean updateAmount(long AccountNo,double newbalance){
        mongoTemplate.update(Account.class)
                .matching(Criteria.where("accountNo").is(AccountNo))
                .apply(new Update().set("accountBalance",newbalance))
                .first();
    return true;
    }

    public Optional<Account> singleAccountUsingCustomerId(long CustomerId){
        return accountRepository.findAccountByCustomerId(CustomerId);
    }

    public boolean UpdateAccount(Long accountNo,String status){
        mongoTemplate.update(Account.class)
                .matching(Criteria.where("accountNo").is(accountNo))
                .apply(new Update().set("status",status))
                .first();
        return true;
    }

    public String UpdatePin(Long accountNo,Long newPin){
        mongoTemplate.update(Account.class)
                .matching(Criteria.where("accountNo").is(accountNo))
                .apply(new Update().set("pin",newPin))
                .first();
        return "Successfully updated Pin";
    }

    public String createAccount(String accountType,Long pin,Long customerId){
        Double accountBalance = 0.0;
        long lastTimestamp = 0L;
        long counter = 0L;
        long timestamp = System.currentTimeMillis();
        if (timestamp == lastTimestamp) {
            counter++;
        } else {
            lastTimestamp = timestamp;
            counter = new Random().nextLong() % 1000000000L; // Random number between -999999999 and 999999999
        }
        Long accountId = Math.abs((timestamp * 1000000000L) + counter) % 1000000000L;
        String status = "PENDING";

        Account acc = new Account(customerId,accountId,accountBalance,accountType, pin, status);
        Account res = accountRepository.insert(acc);
        if (res == null) {
            return "Failed to create Account";
        }
        return "Successfully Created Account";

    }


}
