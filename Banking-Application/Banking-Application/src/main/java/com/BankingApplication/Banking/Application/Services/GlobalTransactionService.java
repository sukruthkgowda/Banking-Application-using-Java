package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Model.GlobalTransaction;
import com.BankingApplication.Banking.Application.Repository.GlobalTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.Date;
@Service
public class GlobalTransactionService {
    @Autowired
    private GlobalTransactionRepository globaltransactionRepository;


    public boolean createGlobalTransaction(Long fromAccount,Long toAccount,String description,Double Amount,String toBankName,String toBankIFSC,String toName){

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
        GlobalTransaction gtrans = new GlobalTransaction(id,d,Amount,description,toAccount,toBankName,toBankIFSC,toName,fromAccount,"PENDING");
        GlobalTransaction res = globaltransactionRepository.insert(gtrans);
        if(res==null){return false;}
        return true;
    }
}
