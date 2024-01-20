package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Repository.NomineeInvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NomineeInvestmentService {
    @Autowired
    private NomineeInvestmentRepository nomineeInvestmentRepository;

}
