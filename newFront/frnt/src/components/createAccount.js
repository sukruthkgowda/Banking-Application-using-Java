import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const CreateAccount = () => {
    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");

    var accno = 0;
    var accbal = 0;

    const [data,setdata] = useState({});
    const [accn,setaccn] = useState({});
    const hasMounted = useRef(false);
    useEffect(()=>{
        
        if(!hasMounted.current){
            hasMounted.current=true;
        
            const userData = new FormData();
            userData.append("customerId",customerId);
        

            var fdata = new FormData();
            fdata.append("CustomerId",customerId);
            axios.post("http://localhost:8080/customer/checkAccount",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);

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

const changeHandler = (event) => {
    const id = event.target.id;
    if(id==="apin"){
        setdata((olddata)=>({...olddata,AccountPin:event.target.value}));
    }else if(id==="password"){
        setdata((olddata)=>({...olddata,Password:event.target.value}));
    }else if(id==="pancardno"){
        setdata((olddata)=>({...olddata,PanCardNo:event.target.value}));
    }
};


const submitHandler = () =>{
   
    var selectBox = document.getElementById("atype");
    var selectedOption = selectBox.options[selectBox.selectedIndex];
    if(selectedOption.value==="#"){
        toast.error("Please Select Account Type !");
        return;}
    
    var accType = "SAVINGS";
   
    if(selectedOption.value==="CURRENT"){
        accType="CURRENT";
    }
    

    var adata = new FormData();
    adata.append("CustomerId",customerId);
    adata.append("PanCardNo",data.PanCardNo);
    adata.append("Password",data.Password);
    adata.append("Pin",data.AccountPin);
    adata.append("AccountType",accType);
    
    console.log(data.PanCardNo);



    axios.post("http://localhost:8080/customer/createAccount",adata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);

        if(res.data==="WrongPassword"){
            toast.error("Wrong Password !");
        }else if(res.data==="Wrong PanCard No"){
            toast.error("Wrong Pan Card Number !");
        }else{
            toast.success("Your Account Application is submitted successfully !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }

});

}

return (
    <div id="topmost" class="bg-[#ECEFF5]">
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
    

    <div className="dropdown">Hello, {username}!
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
                
                </div>
            </div>
            <div  id="content">
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Create Account !</h1>
                <h1 class="text-2xl pt-3">Note: After Applying for loan below do check all Loans Section for Loan Status Update !</h1>
                
                </div>

                <div class="text-left pl-32 pt-5">
                    <table>
                        <tr>
                            
                            <td id="#trnstabletd" colSpan={2}>
                                <select class="ml-0 w-8/12 h-10 rounded-md px-6" id="atype">
                                    <option value="#">Select Account Type</option>
                                    <option value="SAVINGS">Savings</option>
                                    <option value="CURRENT">Current</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Account Pin :</label></td>
                            <td id="trnstabletd"><input type="text" id="apin" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Set an Account Pin"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Pan Card Number :</label></td>
                            <td id="trnstabletd"><input type="text" id="pancardno" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Your Pan Card No."/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Password:</label></td>
                            <td id="trnstabletd"><input type="password" id="password" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Your Password"/></td>
                        </tr>
                        <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Create Account</button></td>
                    </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default CreateAccount;