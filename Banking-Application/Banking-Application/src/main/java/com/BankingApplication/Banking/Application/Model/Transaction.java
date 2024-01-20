package com.BankingApplication.Banking.Application.Model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Transaction")
@Data
public class Transaction
{
    @Id
    private Long transactionID;
    private Date date;
    private Double amount;
    private String description;
    private Long receiveeAccountNo;
    private Long senderAccountNo;
    private String status;
}
