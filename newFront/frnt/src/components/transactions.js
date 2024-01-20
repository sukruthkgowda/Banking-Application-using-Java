import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Logo from "./Common/logo2.png";
import "./drp.css";



const Transactions = () => {

    const [user,setuser] = useState({});
    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");
    var accno = 0;
    var accbal = 0;      
    const hasMounted = useRef(false);  
    useEffect(() => {
        if(!hasMounted.current){
            hasMounted.current=true;
        

        var fdata = new FormData();
        fdata.append("CustomerId",customerId);
        axios.post("http://localhost:8080/customer/checkAccount",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);

            if(res.data==="NOTFOUND"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Please Create your Bank Account to enable Features !</h1><button class='bg-[#2F4266] text-white ml-10 px-20 py-3 mt-10 rounded-md hover:cursor-pointer hover:bg-[#425475]' id='gotoaddaccount'>Add Account</button>";
                document.getElementById("gotoaddaccount").addEventListener("click",()=>{
                    window.location.href="/createaccount";
                });
            }else if(res.data==="APPROVED"){

                axios.post("http://localhost:8080/customer/getAccountDetailsForCustomer",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((resp)=>{
                console.log(resp);
                accno = resp.data.accountNo;
                accbal = resp.data.accountBalance;



                var ffdata = new FormData();
                ffdata.append("customerId",customerId);
                axios.post("http://localhost:8080/customer/AllTransactions",ffdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
                    console.log(res);
                    console.log(accno);
                    var table = document.getElementById("transactions");
                    for(var i=0;i<res.data.length;i++){
                        var row=table.insertRow(-1);
                        var cell1=row.insertCell(0);
                        var cell2=row.insertCell(1);
                        var cell3=row.insertCell(2);
                        var cell4=row.insertCell(3);
                        var cell5=row.insertCell(4);
                        var cell6=row.insertCell(5);
                        var cell7=row.insertCell(6);
                        
                        var AccountNumber = 0;
                        var credit = false;
                        if(res.data[i].senderAccountNo === accno){
                            AccountNumber = res.data[i].receiveeAccountNo;
                        }else{
                            AccountNumber = res.data[i].senderAccountNo;
                            credit = true;
                        }
        
                        if(credit===true){
                            cell1.innerHTML=res.data[i].transactionID;
                            cell2.innerHTML=AccountNumber;
                            cell3.innerHTML=res.data[i].amount;
                            cell4.innerHTML="-";
                            cell5.innerHTML=res.data[i].description;
                            cell6.innerHTML=res.data[i].date;
                            cell7.innerHTML=res.data[i].status;
                        }else{
                            cell1.innerHTML=res.data[i].transactionID;
                            cell2.innerHTML=AccountNumber;
                            cell3.innerHTML="-";
                            cell4.innerHTML=res.data[i].amount;
                            cell5.innerHTML=res.data[i].description;
                            cell6.innerHTML=res.data[i].date;
                            cell7.innerHTML=res.data[i].status;
                        }
                        
                    }
                
            });




                });

                
            }else if(res.data==="REJECTED"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Rejected by Admin !</h1>";
            }else{
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Pending for Approval !</h1>";
            }




        });

     









        }
    },[]);

const logout_func = () =>{
    window.localStorage.setItem('username',"");
    window.localStorage.setItem('customerId',"");
    window.location.href="/";
    
};
const editprofile_func = () => {
    window.location.href="/editprofile";
};

return (
    <div class="bg-[#ECEFF5]">
    <ToastContainer/>
    <div class="h-14 bg-white w-screen grid grid-cols-6">
    <div>
    <img src={Logo} class="pl-5 h-14 w-48"></img>
    </div>
    <div></div>
    
    <div class="col-span-2">
        <h1 class="pt-4 text-xl">BankGO</h1>
    </div>
    
    <div></div>
    

    <div className="dropdown">Hello, {user.username}!
    <div className="dropdownuser-content" onClick={editprofile_func}>
            <p>Update Profile</p>
            </div>
            <div className="dropdownuser2-content" onClick={logout_func}>
            <p>Log Out</p>
            </div>
            
            </div>




    </div>
        <div class="flex flex-row w-screen h-screen mt-2">
            <div class="w-2/12 bg-white text-[#2F4266] h-full">
                
                <div class="pt-8">
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/userdashboard"}>Dashboard</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/transactions"}>Transactions</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/transfermoney"}>Transfer Money</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/addbeneficiary"}>Add Beneficiary</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/allbeneficiary"}>All Beneficiaries</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/applyloan"}>Apply for Loan</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/loanapplications"}>Loan Applications</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/updatenominee"}>Update Nominee</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/changepin"}>Change Pin</div>
                
                </div>
            </div>
            <div id="content" class="w-full">
                <div class="pt-10 pl-10 text-left">
                <h1 class="text-4xl">Transaction History!</h1>
                <h1 class="text-2xl pt-3 pl-1">Find All your Transactions Below!</h1>
                </div>

                <div class="text-left pl-10 pt-1" id="insertdata">
                    <table id="transactions">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Account No</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

    
};

export default Transactions;