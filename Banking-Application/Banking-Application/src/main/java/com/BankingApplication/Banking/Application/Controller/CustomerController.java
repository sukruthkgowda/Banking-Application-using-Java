package com.BankingApplication.Banking.Application.Controller;

import com.BankingApplication.Banking.Application.Model.*;
import com.BankingApplication.Banking.Application.Services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private BeneficiaryService beneficiaryService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private LoanService loanService;

    @Autowired
    private NomineeLoanService nomineeLoanService;

    @Autowired
    private GlobalTransactionService globaltransactionService;

    @Autowired
    private InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return new ResponseEntity<List<Customer>>(customerService.allCustomers(), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> LoginCustomer(@RequestParam("Username") String Username,
                                                 @RequestParam("Password") String Password){
        String ans = customerService.loginCustomer(Username,Password);
        System.out.println("Reached Controller");

        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }





    @PostMapping("/register")
    public ResponseEntity<String> RegisterCustomer(@RequestParam("Name") String Name,
                                                     @RequestParam("PhoneNumber") Long PhoneNumber,
                                                     @RequestParam("Address") String Address,
                                                     @RequestParam("Email") String Email,
                                                     @RequestParam("Username") String Username,
                                                     @RequestParam("Password") String Password,
                                                     @RequestParam("Aadhaar") Long aadhaarcardNo,
                                                     @RequestParam("PanCard") String pancardNo

    ){
        Optional<Customer> cc = customerService.findCustomerByUsername(Username);
        if(cc.isPresent()==true){
            return new ResponseEntity<>("UsernameExists",HttpStatus.CREATED);
        }else{
            boolean ans = customerService.createCustomer(Name,PhoneNumber,Address,Email,Username,Password,aadhaarcardNo,pancardNo);
            if(ans==false){
                return new ResponseEntity<>("false",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("true",HttpStatus.CREATED);
            }

        }

    }

    @PostMapping("/updateProfile")
    public ResponseEntity<String> UpdateProfile(@RequestParam("Name") String Name,
                                                    @RequestParam("PhoneNumber") Long PhoneNumber,
                                                    @RequestParam("Address") String Address,
                                                    @RequestParam("Email") String Email,
                                                    @RequestParam("Username") String Username,
                                                    @RequestParam("Password") String Password,
                                                    @RequestParam("CustomerId") Long CustomerId){

        Optional<Customer> res = customerService.singleCustomer(CustomerId);
        if(res.get().getPassword().equals(Password)==false){
            return new ResponseEntity<>("WrongPassword",HttpStatus.CREATED);
        }

        Optional<Customer> curr = customerService.findCustomerByUsername(Username);
        if(curr.isEmpty()==false && curr.get().getCustomerID().equals(CustomerId)==false){
            return new ResponseEntity<>("UsernameTaken",HttpStatus.CREATED);
        }
        boolean ans = customerService.updateCustomer(CustomerId,Name,PhoneNumber,Address,Email,Username);
        if(ans==false){
            return new ResponseEntity<>("SomeError",HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Updated",HttpStatus.CREATED);
    }

    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(
            @RequestParam("PanCardNo") String panCardNo,
            @RequestParam("Password") String password,
            @RequestParam("AccountType") String accountType,
            @RequestParam("CustomerId") Long customerId,
            @RequestParam("Pin") Long pin
    ){
        Optional<Customer> res = customerService.singleCustomer(customerId);
        if(res.get().getPassword().equals(password)==false){
            return new ResponseEntity<>("WrongPassword",HttpStatus.CREATED);
        }
        if(res.get().getPanCardNo().equals(panCardNo)==false){
            return new ResponseEntity<>("Wrong PanCard No",HttpStatus.CREATED);
        }

        String ans = accountService.createAccount(accountType,pin,customerId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }
    //update pin
    @PostMapping("/ChangePIN")
    public ResponseEntity<String> changepin(
            @RequestParam("OldPIN") Long oldPin,
            @RequestParam("NewPIN") Long newPin,
            @RequestParam("CustomerID") Long customerId
    ){
        Optional<Account> res = accountService.singleAccountUsingCustomerId(customerId);
        if(res.get().getPin().equals(oldPin)==false){
            return new ResponseEntity<>("WrongPin",HttpStatus.CREATED);
        }
        Long accountNo = res.get().getAccountNo();
        String ans = accountService.UpdatePin(accountNo,newPin);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }
    @PostMapping("/applyLoan")
    public ResponseEntity<Boolean> ApplyLoan(
            @RequestParam("Name") String nomineeName,
            @RequestParam("PhoneNumber") Long nomineePhoneNumber,
            @RequestParam("Address") String nomineeAddress,
            @RequestParam("Email") String nomineeEmail,
            @RequestParam("Relation") String nomineeRelation,
            @RequestParam("LoanType") String loanType,
            @RequestParam("InterestRate") Double interestRate,
            @RequestParam("Term") Long Term,
            @RequestParam("AmountRequested") Long amountRequested,
            @RequestParam("CustomerId") Long CustomerId
    ){
        Long loanID = loanService.createLoan(loanType,interestRate,Term,amountRequested,CustomerId);
        Boolean ans = nomineeLoanService.createLoanNominee(loanID,nomineeName,nomineePhoneNumber,nomineeAddress,nomineeEmail,nomineeRelation);
        if(ans==false){
            return new ResponseEntity<>(false,HttpStatus.CREATED);
        }
        return new ResponseEntity<>(true,HttpStatus.CREATED);

    }

    @PostMapping("/updateNomineeLoan")
    public ResponseEntity<String> UpdateNomineeLoan(
            @RequestParam("Name") String nomineeName,
            @RequestParam("PhoneNumber") Long nomineePhoneNumber,
            @RequestParam("Address") String nomineeAddress,
            @RequestParam("Email") String nomineeEmail,
            @RequestParam("Relation") String nomineeRelation,
            @RequestParam("LoanId") Long loanId,
            @RequestParam("CustomerId") Long customerId,
//            @RequestParam("Username") String username,
            @RequestParam("Password") String password
    ){
        Optional<Customer> res = customerService.singleCustomer(customerId);
        if(res.get().getPassword().equals(password)==false){
            return new ResponseEntity<>("WrongPassword",HttpStatus.CREATED);
        }
        Boolean ans = nomineeLoanService.UpdateNomineeLoan(nomineeName,nomineePhoneNumber,nomineeAddress,nomineeEmail,nomineeRelation,loanId);
        if(ans==false){
            return new ResponseEntity<>("SomeError",HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Updated",HttpStatus.CREATED);


    }

    @PostMapping("/getNomineeLoanDetails")
    public ResponseEntity<Optional<NomineeLoan>> GetNomineeLoanDetails(@RequestParam("LoanId") Long loanId){
        Optional<NomineeLoan> ans = nomineeLoanService.singleNomineeLoan(loanId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }


    @PostMapping("/getLoans")
    public ResponseEntity<List<Long>> GetLoans(@RequestParam("CustomerId") Long customerId){
        List<Long> ans = loanService.getLoans(customerId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }

    //given a customerId return all the loan details
    @PostMapping("/getAllLoans")
    public ResponseEntity<List<Loan>> GetAllLoans(@RequestParam("CustomerId") Long customerId){
        List<Loan> ans = loanService.getAllLoans(customerId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }

    //Given a customerId we will return all the customer Details
    @PostMapping("/getCustomerDetails")
    public ResponseEntity<Optional<Customer>> GetCustomerDetails(@RequestParam("customerId") Long customerId){

        Optional<Customer> ans = customerService.singleCustomer(customerId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }



    //Given CustomerId, return account details(all fields).
    @PostMapping("/getAccountDetails")
    public ResponseEntity<Optional<Account>> GetAccountDetails(
            @RequestParam("CustomerId") Long customerId
    ){
        Optional<Account> acc = accountService.singleAccountUsingCustomerId(customerId);
        return new ResponseEntity<>(acc,HttpStatus.CREATED);
    }


    //implemented the below function in

//    @PostMapping("/UpdateLoanStatus")
//    public ResponseEntity<Boolean> updateLoanStatus(
//            @RequestParam("LoanId") Long loanId,
//            @RequestParam("Status") String status
//    ){
//        return new ResponseEntity<>(loanService.UpdateLoanStatus(loanId,status),HttpStatus.CREATED);
//    }

    @PostMapping("/AllTransactions")
    public ResponseEntity<List<Transaction>> GetAllTransactions(@RequestParam("customerId") Long customerId){
        Optional<Account> account = accountService.singleAccountUsingCustomerId(customerId);

        if(account.isEmpty()==true){
            List<Transaction> res = new ArrayList<Transaction>();
            return new ResponseEntity<>(res,HttpStatus.CREATED);
        }

        Long accountNo = account.get().getAccountNo();
        //Need to take care of case where accountNo is not present
        List<Transaction> transactions = transactionService.allTransactions(accountNo);
        return new ResponseEntity<>(transactions,HttpStatus.CREATED);
    }

//Given a customerId, we will return a list of all the Investment transactions that are associated with that customer
    @GetMapping("/investmentTransactions")
    public ResponseEntity<List<Investment>> InvestmentTransactions(@RequestParam("CustomerId") Long customerId){
//        System.out.println("customerId: " + customerId);
        List<Investment> res = investmentService.investmentTransactions(customerId);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }



    @PostMapping("/checkAccount")
    public ResponseEntity<String> CheckAccount(@RequestParam("CustomerId") Long customerId){

        System.out.println("++++++++++++++++++++");
        System.out.println(customerId);
        System.out.println("+++++++++++++++++++++");
        Optional<Account> res = accountService.singleAccountUsingCustomerId(customerId);
        if(res.isPresent()){
            if(res.get().getStatus().equals("PENDING")){
                return new ResponseEntity<>("PENDING",HttpStatus.CREATED);
            }else if(res.get().getStatus().equals("APPROVED")){
                return new ResponseEntity<>("APPROVED",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("REJECTED",HttpStatus.CREATED);
            }

        }
        return new ResponseEntity<>("NOTFOUND",HttpStatus.CREATED);
    }

    @PostMapping("/getAccountDetailsForCustomer")
    public ResponseEntity<Optional<Account>> getAccountDetailsForCustomer(@RequestParam("CustomerId") Long customerId){
        Optional<Account> res = accountService.singleAccountUsingCustomerId(customerId);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }


    @PostMapping("/transfermoney")
    public ResponseEntity<String> TransferMoney(@RequestParam("customerId") Long customerId,
                                                    @RequestParam("Amount") Double Amount,
                                                    @RequestParam("Description") String Description,
                                                    @RequestParam("Password") String Password,
                                                    @RequestParam("ToAccount") Long ToAccount){

        System.out.println(customerId);
        System.out.println(ToAccount);

        Optional<Customer> cust = customerService.singleCustomer(customerId);
        System.out.println(cust);
        if(cust.isEmpty()==true){
            return new ResponseEntity<>("UserNotFound",HttpStatus.CREATED);
        }else{
            if(cust.get().getPassword().equals(Password)==false){
                return new ResponseEntity<>("WrongPassword",HttpStatus.CREATED);
            }
        }
        long custId=customerId;
        Optional<Account> fromAcc = accountService.singleAccountUsingCustomerId(custId);
        Optional<Account> toAcc = accountService.singleAccount(ToAccount);
        System.out.println(fromAcc.isPresent());
        System.out.println(toAcc.isEmpty());
        if(fromAcc.isEmpty()==true){
            return new ResponseEntity<>("FromAccountNotFound",HttpStatus.CREATED);
        }

        if(fromAcc.get().getAccountBalance()<Amount){
            return new ResponseEntity<>("LowBalance",HttpStatus.CREATED);
        }

        Long fromAccount = fromAcc.get().getAccountNo();
        System.out.println(fromAccount);

        Double fromBalance = fromAcc.get().getAccountBalance();
        System.out.println(fromBalance);

        Double newfromBalance = fromBalance - Amount;
        boolean transres = accountService.updateAmount(fromAccount,newfromBalance);
        System.out.println("Transaction Result"+transres);
        transactionService.createTransaction(fromAccount,ToAccount,Description,Amount);

        if(toAcc.isEmpty()==true){

            Optional<Beneficiary> benns = beneficiaryService.singleBeneficiary(ToAccount);
            if(benns.isEmpty()==true){
                return new ResponseEntity<>("ToBenficiaryNotFound",HttpStatus.CREATED);
            }

            boolean gans = globaltransactionService.createGlobalTransaction(fromAccount,ToAccount,Description,Amount,benns.get().getBeneficiaryBank(),benns.get().getBankIFSC(),benns.get().getBeneficiaryName());
            if(gans==true){
                return new ResponseEntity<>("ToAccountNotFoundAddedtoGlobal",HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("ToAccountNotFound",HttpStatus.CREATED);
            }


        }

        Double toBalance = toAcc.get().getAccountBalance();
        Double newtoBalance = toBalance + Amount;
        boolean transres2 = accountService.updateAmount(ToAccount,newtoBalance);


        return new ResponseEntity<>("TransactionDone",HttpStatus.CREATED);

    }



    @PostMapping("/getallbeneficiaries")
    public ResponseEntity<List<Beneficiary>> GetAllBeneficiaries(@RequestParam("customerId") Long customerId){
        List<Beneficiary> ans = beneficiaryService.getAllBeneficiariesByCustomerId(customerId);
        return new ResponseEntity<>(ans,HttpStatus.CREATED);
    }




    @PostMapping("/addBeneficiary")
    public ResponseEntity<Boolean> AddBeneficiary(@RequestParam("customerId") Long customerId,
                                                    @RequestParam("accountNo") Long accountNo,
                                                    @RequestParam("beneficiaryName") String beneficiaryName,
                                                    @RequestParam("beneficiaryBank") String beneficiaryBank,
                                                    @RequestParam("bankIFSC") String bankIFSC,
                                                    @RequestParam("status") String status){

        boolean ans = beneficiaryService.createBeneficiary(customerId,accountNo,beneficiaryName,beneficiaryBank,bankIFSC,status);
        if(ans==false){
            return new ResponseEntity<>(false,HttpStatus.CREATED);
        }
        return new ResponseEntity<>(true,HttpStatus.CREATED);

    }


    @GetMapping("/{CustomerID}")
    public ResponseEntity<Optional<Customer>> getSingleCustomer(@PathVariable long CustomerID){
        return new ResponseEntity<Optional<Customer>>(customerService.singleCustomer(CustomerID),HttpStatus.CREATED);
    }


}
