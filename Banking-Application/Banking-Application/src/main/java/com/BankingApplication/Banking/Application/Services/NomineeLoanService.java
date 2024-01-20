package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Model.Loan;
import com.BankingApplication.Banking.Application.Model.NomineeLoan;
import com.BankingApplication.Banking.Application.Repository.NomineeLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NomineeLoanService {
    @Autowired
    private NomineeLoanRepository nomineeLoanRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Boolean createLoanNominee(Long loanID,String nomineeName,Long nomineePhoneNumber,String nomineeAddress,String nomineeEmail,String nomineeRelation){
        NomineeLoan nominee = new NomineeLoan(nomineeName,nomineePhoneNumber,nomineeEmail,nomineeAddress,nomineeRelation,loanID);
        NomineeLoan res = nomineeLoanRepository.insert(nominee);
        if(res==null){return false;}
        return true;
    }

    public Boolean UpdateNomineeLoan(String nomineeName,Long nomineePhoneNumber,String nomineeAddress,String nomineeEmail,String nomineeRelation,Long loanId){
        mongoTemplate.update(NomineeLoan.class)
                .matching(Criteria.where("loanID").is(loanId))
                .apply(new Update().set("name",nomineeName))
                .first();
        mongoTemplate.update(NomineeLoan.class)
                .matching(Criteria.where("loanID").is(loanId))
                .apply(new Update().set("phoneNumber",nomineePhoneNumber))
                .first();
        mongoTemplate.update(NomineeLoan.class)
                .matching(Criteria.where("loanID").is(loanId))
                .apply(new Update().set("address",nomineeAddress))
                .first();
        mongoTemplate.update(NomineeLoan.class)
                .matching(Criteria.where("loanID").is(loanId))
                .apply(new Update().set("email",nomineeEmail))
                .first();
        mongoTemplate.update(NomineeLoan.class)
                .matching(Criteria.where("loanID").is(loanId))
                .apply(new Update().set("relation",nomineeRelation))
                .first();
        return true;
    }
    public Optional<NomineeLoan> singleNomineeLoan(long id){
        return nomineeLoanRepository.findById(id);
    }
}
