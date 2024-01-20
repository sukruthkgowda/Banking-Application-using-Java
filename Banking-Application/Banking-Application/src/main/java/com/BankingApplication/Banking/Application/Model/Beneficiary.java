package com.BankingApplication.Banking.Application.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Beneficiary")
@Data
public class Beneficiary
{
    private Long customerId;
    private Long accountNo;
    private String beneficiaryName;
    private String beneficiaryBank;
    private String bankIFSC;
    private String status;
}
