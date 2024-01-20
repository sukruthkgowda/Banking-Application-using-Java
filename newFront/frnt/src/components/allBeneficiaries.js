import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import Logo from "./Common/logo2.png";
import "./drp.css";

const AllBeneficiary = () => {

    const [user,setuser] = useState({});
    const [ben,setben] = useState({});
    
    const [displayData,setdisplayData] = useState([]);

    var username=window.localStorage.getItem("username");
    var customerId=window.localStorage.getItem("customerId");
    const hasMounted = useRef(false);
    useEffect(()=>{
        if(!hasMounted.current){hasMounted.current=true;

        var ffdata = new FormData();
        ffdata.append("CustomerId",customerId);
        axios.post("http://localhost:8080/customer/checkAccount",ffdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            

            if(res.data==="NOTFOUND"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Please Create your Bank Account to enable Features !</h1><button class='bg-[#2F4266] text-white ml-10 px-20 py-3 mt-10 rounded-md hover:cursor-pointer hover:bg-[#425475]' id='gotoaddaccount'>Add Account</button>";
                document.getElementById("gotoaddaccount").addEventListener("click",()=>{
                    window.location.href="/createaccount";
                });
                return;
            }else if(res.data==="APPROVED"){
                
            }else if(res.data==="REJECTED"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Rejected by Admin !</h1>";
            }else{
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Pending for Approval !</h1>";
            }




    
        });










        var fdata = new FormData();
        fdata.append("customerId",customerId);
        axios.post("http://localhost:8080/customer/getallbeneficiaries",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            for(var i=0;i<res.data.length;i++){
                displayData.push(res.data[i])
            }
            console.log(displayData);

            const tab = document.getElementById("tab");
            for(var j=0;j<displayData.length;j++){
            const newRow = tab.insertRow();

            // Create cells in the new row
            const cell1 = newRow.insertCell();
            const cell2 = newRow.insertCell();
            const cell3 = newRow.insertCell();
            const cell4 = newRow.insertCell();
            const cell5 = newRow.insertCell();

            cell1.innerHTML = displayData[j].beneficiaryName;
            cell2.innerHTML = displayData[j].accountNo;
            cell3.innerHTML = displayData[j].beneficiaryBank;
            cell4.innerHTML = displayData[j].bankIFSC;
            cell5.innerHTML = displayData[j].status;
            }
            
        })

    }
    });
    

const logout_func = () =>{
    window.localStorage.setItem('username',"");
    window.localStorage.setItem('customerId',"");
    window.location.href="/";
};
const editprofile_func = () => {
    window.location.href="/editprofile";
};



return (
    <>
    
    <div class="bg-[#ECEFF5]">
    
    <div class="h-14 bg-white w-screen grid grid-cols-6">
    <div>
    <img src={Logo} class="pl-5 h-14 w-48"></img>
    </div>
    <div></div>
    
    <div class="col-span-2">
        <h1 class="pt-4 text-xl">BankGO</h1>
    </div>
    
    <div></div>
    

    <div className="dropdown">Hello, {username}!
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
                <div class="pt-16 pl-10 text-left">
                <h1 class="text-4xl">All Beneficiaries!</h1>
                <h1 class="text-lg pt-3 opacity-70">Please Find all your Beneficiaries Below !</h1>
                </div>

                <div class="text-left pl-10 pt-8">
                    <table id="tab">
                        <tr>
                            <th>Beneficiary Name</th>
                            <th>Account No</th>
                            <th>Beneficiary Bank</th>
                            <th>Beneficiary IFSC</th>
                            <th>Beneficiary status</th>
                        </tr>
                           

                    </table>
                </div>

            </div>
        </div>
    </div>
    </>
);
    
};

export default AllBeneficiary;