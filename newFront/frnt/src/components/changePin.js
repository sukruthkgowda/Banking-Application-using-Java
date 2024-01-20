import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const ChangePin = () => {
    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");

    var accno = 0;
    var accbal = 0;
    const [data,setdata] = useState({});
    const [user,setuser] = useState({});
    const [accn,setaccn] = useState({});
    const hasMounted = useRef(false);
    useEffect(()=>{
        
        if(!hasMounted.current){hasMounted.current=true;
        
        const userData = new FormData();
        userData.append("customerId",customerId);
        

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
            }else if(res.data==="REJECTED"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Rejected by Admin !</h1>";
            }else{
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Pending for Approval !</h1>";
            }
        });

    }
    },[]);


const getTrans = () =>{
    if(accno != 0){
        var ffdata = new FormData();
        ffdata.append("customerId",customerId);
        axios.post("http://localhost:8080/customer/AllTransactions",ffdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            var table = document.getElementById("transactions");
            for(var i=0;i<Math.min(res.data.length,5);i++){
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

                if(credit==true){
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
        }
}


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
    if(id==="oldpin"){
        setdata((olddata)=>({...olddata,OldPin:event.target.value}));
    }else if(id==="newpin"){
        setdata((olddata)=>({...olddata,NewPin:event.target.value}));
    }else if(id==="confirmnewpin"){
        setdata((olddata)=>({...olddata,ConfirmNewPin:event.target.value}));
    }
};


const submitHandler = () =>{
    
    if(data.NewPin  !== data.ConfirmNewPin){
        toast.error("Re-Entered Pin Does Not match");
        return;
    }


    var ldata = new FormData();
    ldata.append("CustomerID",customerId);
    ldata.append("OldPIN",data.OldPin);
    ldata.append("NewPIN",data.NewPin);

    




    axios.post("http://localhost:8080/customer/ChangePIN",ldata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);

        if(res.data==="WrongPin"){
            toast.error("Your Old Pin Does not match !");
        }else{
            toast.success("Pin Updated Successfull !");
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
        <div class="flex flex-row h-screen w-screen mt-2">
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
            <div  id="content" class="w-full">
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Change Your Account Pin!</h1>
                <h1 class="text-2xl pt-3">Note: Please change your pin frequently to avoid any theft danger !</h1>
                
                </div>

                <div class="text-left pl-10 pt-10">
                <table>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Old Pin :</label></td>
                            <td id="trnstabletd"><input type="text" id="oldpin" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Old Pin "/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">New Pin : </label></td>
                            <td id="trnstabletd"><input type="text" id="newpin" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter New Pin"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Confirm New Pin : </label></td>
                            <td id="trnstabletd"><input type="text" id="confirmnewpin" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Confirm New Pin"/></td>
                        </tr>
                        <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Update Pin</button></td>
                    </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default ChangePin;