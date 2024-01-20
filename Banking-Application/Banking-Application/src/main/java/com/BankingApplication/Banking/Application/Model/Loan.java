package com.BankingApplication.Banking.Application.Model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Loan")
@Data
public class Loan
{
    @Id
    private Long loanID;
    private Long customerID;
    private String loanType;
    private Double interestRate;
    private Long term;
    private Long amountRequested;
    private String status;
//
//    private String nomineeName;
//    private Long nomineePhoneNumber;
//    private String nomineeEmail;
//    private String nomineeAddress;
//    private String nomineeRelation;
}
