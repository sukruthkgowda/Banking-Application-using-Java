package com.BankingApplication.Banking.Application.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Investment")
@Data
public class Investment
{
    @Id
    private Long investmentId;
    private Double investmentBalance;
    private String investmentType;
    private Long customerID;
}
