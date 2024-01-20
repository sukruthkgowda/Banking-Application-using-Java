package com.BankingApplication.Banking.Application.Model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Customer")
@Data
public class Customer {
    @Id
    private Long customerID;
    private String name;
    private Long phoneNumber;
    private String email;
    private String address;
    private String username;
    private String password;
    private Long aadhaarCardNo;
    private String panCardNo;
}