package com.BankingApplication.Banking.Application.Repository;

import com.BankingApplication.Banking.Application.Model.Beneficiary;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeneficiaryRepository extends MongoRepository<Beneficiary, Long> {
    List<Beneficiary> findBeneficiaryByCustomerId(long customerId);
    Optional<Beneficiary> findBeneficiaryByAccountNo(long accountNo);

    List<Beneficiary> findBeneficiaryByStatus(String status);
}
