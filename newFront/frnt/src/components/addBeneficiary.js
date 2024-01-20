import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Logo from "./Common/logo2.png";
import "./trns.css";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBeneficiary = () => {

    const [user,setuser] = useState({});
    const [ben,setben] = useState({});
    
    var username="";
    var customerId=0;
    username = window.localStorage.getItem("username");
    customerId = window.localStorage.getItem("customerId");
    user.username=username;

    useEffect(()=>{
        

        var fdata = new FormData();
        fdata.append("CustomerId",customerId);
        axios.post("http://localhost:8080/customer/checkAccount",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
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
    });
    

const logout_func = () =>{
    window.localStorage.setItem('username',"");
    window.localStorage.setItem('customerId',"");
    window.location.href="/";
};
const editprofile_func = () => {
    window.location.href="/editprofile";
};


const changeHandler = (event) => {
    const id = event.target.id;
    if(id==="bname"){
        setben((olddata)=>({...olddata,Bname:event.target.value}));
    }else if(id==="bbank"){
        setben((olddata)=>({...olddata,Bbank:event.target.value}));
    }else if(id==="bifsc"){
        setben((olddata)=>({...olddata,Bifsc:event.target.value}));
    }else if(id==="bacn"){
        setben((olddata)=>({...olddata,Bacn:event.target.value}));
    }
};

const submitHandler = () =>{


    

    console.log(ben);
    console.log(username);
    console.log(customerId);
   
    var dat = new FormData();
    dat.append("customerId",customerId);
    dat.append("accountNo",ben.Bacn);
    dat.append("beneficiaryName",ben.Bname);
    dat.append("beneficiaryBank",ben.Bbank);
    dat.append("bankIFSC",ben.Bifsc);
    dat.append("status","PENDING");
    console.log(dat);

    axios.post("http://localhost:8080/customer/addBeneficiary",dat,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        if(res.data===true){
            toast.success("Beneficiary Added Successfully !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }else{
            toast.error("Error Adding Beneficiary !");
        }
    });
}

return (
    <>
    <ToastContainer/>
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
    

    <div className="dropdown">Hello, {user.username}!
    <div className="dropdownuser-content" onClick={editprofile_func}>
            <p>Update Profile</p>
            </div>
            <div className="dropdownuser2-content" onClick={logout_func}>
            <p>Log Out</p>
            </div>
            
            </div>




    </div>
        <div class="flex flex-row h-screen mt-2">
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
                <h1 class="text-4xl">Add Beneficiary!</h1>
                <h1 class="text-lg pt-3 opacity-70">Note: You Will be able to make transactions to the beneficiary after it has been approved by bank teller!</h1>
                </div>

                <div class="text-left pl-56 pt-16">
                    <table> 
                    <tr>
                        <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Beneficiary Name:</label></td>
                        <td id="trnstabletd"><input type="text" id="bname" onChange={(event)=>changeHandler(event)} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Benficiary Name'></input></td>
                    </tr>
                    <tr class="py-8">
                        <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Beneficiary Bank:</label></td>
                        <td id="trnstabletd"><input type="text" id="bbank" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Benficiary Bank'></input></td>
                    </tr>
                    <tr class="py-8">
                    <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Beneficiary Bank IFSC:</label></td>
                    <td id="trnstabletd"><input type="text" id="bifsc" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Benficiary Bank IFSC'></input></td>
                    </tr>
                    <tr class="py-8">
                    <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Beneficiary Account No:</label></td>
                    <td id="trnstabletd"><input type="text" id="bacn" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Benficiary Account No.'></input></td>
                    </tr>
                    <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Add Beneficiary</button></td>
                    </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
    </>
);
    
};

export default AddBeneficiary;