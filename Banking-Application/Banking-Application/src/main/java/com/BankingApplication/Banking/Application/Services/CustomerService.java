package com.BankingApplication.Banking.Application.Services;

import com.BankingApplication.Banking.Application.Model.Account;
import com.BankingApplication.Banking.Application.Model.Customer;
import com.BankingApplication.Banking.Application.Repository.CustomerRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;


import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Customer> allCustomers() {
        return customerRepository.findAll();
    }

    public boolean createCustomer(String Name, Long PhoneNumber, String Address, String Email, String Username, String Password, Long aadhaarNo, String panCard) {

        long lastTimestamp = 0L;
        long counter = 0L;
        long timestamp = System.currentTimeMillis();
        if (timestamp == lastTimestamp) {
            counter++;
        } else {
            lastTimestamp = timestamp;
            counter = new Random().nextLong() % 1000000000L; // Random number between -999999999 and 999999999
        }
        Long id = Math.abs((timestamp * 1000000000L) + counter) % 1000000000L;


        Customer cust = new Customer(id, Name, PhoneNumber, Email, Address, Username, Password, aadhaarNo, panCard);
        Customer res = customerRepository.insert(cust);
        if (res == null) {
            return false;
        }
        return true;
    }

    public String loginCustomer(String Username, String Password) {
        System.out.println("Reached Service");
        Optional<Customer> res = customerRepository.findCustomerByUsername(Username);
        System.out.println("Got from repo");
        if (res.isPresent()) {
            if (Password.equals(res.get().getPassword())) {
                System.out.println(res.get());
                Long cid = res.get().getCustomerID();
                String cids = Long.toString(cid);
                return ("correctPassword" + "," + cids);
            } else {
                return "wrongPassword";
            }
        }
        return "userNotRegistered";
    }

    public boolean updateCustomer(Long CustomerId, String Name, Long PhoneNumber, String Address, String Email, String Username) {

        mongoTemplate.update(Customer.class)
                .matching(Criteria.where("customerID").is(CustomerId))
                .apply(new Update().set("name", Name))
                .first();
        mongoTemplate.update(Customer.class)
                .matching(Criteria.where("customerID").is(CustomerId))
                .apply(new Update().set("phoneNumber", PhoneNumber))
                .first();
        mongoTemplate.update(Customer.class)
                .matching(Criteria.where("customerID").is(CustomerId))
                .apply(new Update().set("address", Address))
                .first();
        mongoTemplate.update(Customer.class)
                .matching(Criteria.where("customerID").is(CustomerId))
                .apply(new Update().set("email", Email))
                .first();
        mongoTemplate.update(Customer.class)
                .matching(Criteria.where("customerID").is(CustomerId))
                .apply(new Update().set("username", Username))
                .first();
        return true;
    }


    public Optional<Customer> singleCustomer(long id) {
        return customerRepository.findCustomerByCustomerID(id);
    }

    public Optional<Customer> findCustomerByUsername(String Username) {
        return customerRepository.findCustomerByUsername(Username);
    }

}
