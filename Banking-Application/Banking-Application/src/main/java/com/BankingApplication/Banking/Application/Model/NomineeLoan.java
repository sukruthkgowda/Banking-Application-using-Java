package com.BankingApplication.Banking.Application.Model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "NomineeLoan")
@Data
public class NomineeLoan
{
    private String name;
    private Long phoneNumber;
    private String email;
    private String address;
    private String relation;
    @Id
    private Long loanID;
}
