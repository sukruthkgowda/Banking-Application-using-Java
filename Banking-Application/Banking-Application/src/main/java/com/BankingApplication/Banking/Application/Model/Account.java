package com.BankingApplication.Banking.Application.Model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Account")
@Data
public class Account
{

    private Long customerId;
//    @Id
    private Long accountNo;
    private Double accountBalance;
    private String accountType;
    private Long pin;
    private String status;
}