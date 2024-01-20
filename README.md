# Banking-Application

## Problem Statement:
Design and develop a banking application using Java and the Spring Boot framework, with 
the aim of providing users with a secure and convenient way to manage their finances. The 
application should allow users to create accounts, view their transaction history, transfer 
money between accounts, apply for loans, invest in mutual funds, and make changes to their 
account settings

## Features
- Transfer money - This use case involves allowing users to transfer money between 
their accounts or to other accounts within the bank. The user should be able to enter 
the recipient's account details and the amount to transfer, and the system should verify 
that the transaction is valid and update the relevant account balances.
- Edit profile - This use case allows users to view and update their personal 
information, such as their name, address, and contact details. The system should 
provide a secure interface for users to make changes and validate any updates before 
saving them to the database.
- Create account - This use case involves allowing users to create new accounts, such as 
savings, checking, or investment accounts. The system should verify that the user is 
eligible to open an account and create the account with the appropriate settings.
- View customer list - This use case allows authorized users to view a list of all 
customers who have accounts with the bank. This feature can be useful for customer 
service representatives, managers, or other stakeholders who need to access customer 
data.
- View transactions - This use case allows users to view a history of their transactions, 
including deposits, withdrawals, transfers, and other transactions. The system should 
provide a secure interface for users to access this information and ensure that only 
authorized users can view transaction history.
- Apply for loan - This use case involves allowing users to apply for loans, such as 
personal loans, auto loans, or mortgages. The system should verify that the user is 
eligible for the loan and provide a secure interface for the user to enter their 
application information.
- Login / Register – Allows user to login / register into our application.
- Change PIN - This use case allows users to change their PIN (personal identification 
number), which is used to authenticate the user when accessing their account.

## Requirements
- Mongo-DB
- Intellij
- node
- jdk-17.06

## To Start the application
#### Open the Banking-Application folder in Intellij.
- Navigate to the **BankingApplication.java** file and click **run**</br>
#### To start the Front-end, naviagte into the newFront/frnt
- Install the node modules specified in the package.json using the command - npm install
- After successfull installation
  - **npm start**
#### Make sure to connect the mongoDB
- connect the mongoDB **"mongodb://localhost:27017"**
- make a new Database named "OOADJ"
- You can change the Database connections in the **application.properties** file in the Banking-Application folder
