package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Account;
import com.BankingApplication.Banking.Application.Model.Beneficiary;
import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Repository.BeneficiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficiaryService {
    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public boolean createBeneficiary(Long customerId,Long AccountNo,String beneficiaryName,String beneficiaryBank, String bankIFSC,String status){
        Beneficiary ben = new Beneficiary(customerId,AccountNo,beneficiaryName,beneficiaryBank,bankIFSC,status);
        Beneficiary res = beneficiaryRepository.insert(ben);
        if(res==null){return false;}
        return true;
    }

    public Optional<Beneficiary> singleBeneficiary(long AccountNo){
        return beneficiaryRepository.findBeneficiaryByAccountNo(AccountNo);
    }

    public List<Beneficiary> getAllBeneficiariesByCustomerId(Long customerId){
        List<Beneficiary> res = beneficiaryRepository.findBeneficiaryByCustomerId(customerId);
        return res;
    }

    public List<Beneficiary> findAllPending(){
        List<Beneficiary> res = beneficiaryRepository.findBeneficiaryByStatus("PENDING");
        return res;
    }

    public boolean UpdateBeneficiary(Long accountNo,String status){
        mongoTemplate.update(Beneficiary.class)
                .matching(Criteria.where("accountNo").is(accountNo))
                .apply(new Update().set("status",status))
                .first();
        return true;
    }




}
