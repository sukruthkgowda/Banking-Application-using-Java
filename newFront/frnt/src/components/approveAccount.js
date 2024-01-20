import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./drp.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const ApproveAccount = () => {
    var username = window.localStorage.getItem("username");


    const [user,setuser] = useState({});
    
    const hasMounted = useRef(false);
    useEffect(()=>{
        
        if(!hasMounted.current){
            hasMounted.current=true;

            axios.post("http://localhost:8080/bank/getAllCustomers",{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
                console.log(res);

               for(var i=0;i<res.data.length;i++){

                var cid = res.data[i].customerID;
                var cname=res.data[i].name;
                var pno = res.data[i].panCardNo;
                var ano = res.data[i].aadharCardNo;

                var cdata = new FormData();
                cdata.append("CustomerId",cid);
                console.log(cid,cname,pno,ano);

                var ans = check_account(cid,cname,pno,ano);
                
                


               } 
            });
        }
    },[]);


const check_account = (cid,cname,pno,ano) => {
    var checkdata = new FormData();
    checkdata.append("CustomerId",cid);
    console.log(cid);
    console.log(cid,cname,pno,ano);
    let ans = "";
    axios.post("http://localhost:8080/customer/checkAccount",checkdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((resp)=>{
        console.log(resp);    
        ans = resp.data;
        console.log(ans);
        if(ans==="PENDING"){
            addtotable(cid,cname,pno,ano);  
        }
    });
    return ans;
}

const addtotable = (cid,cname,pno,ano) => {
    var checkdata = new FormData();
    checkdata.append("CustomerId",cid);
    console.log(cid);
    axios.post("http://localhost:8080/customer/getAccountDetailsForCustomer",checkdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((respp)=>{
                            
                        console.log(respp);    
                            var table = document.getElementById("accounts");
                            var row = table.insertRow(-1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);

                            cell1.innerHTML = cid;
                            cell2.innerHTML = cname;
                            cell3.innerHTML = pno;
                            cell4.innerHTML = ano;
                            cell5.innerHTML = respp.data.accountType;
                            cell6.innerHTML = `<div class="flex flex-row gap-3"><button id="${respp.data.accountNo}-Accept" class="bg-[#2F4266] text-white ml-10 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Accept</button><button id="${respp.data.accountNo}-Reject" class="bg-[#2F4266] text-white ml-10 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Reject</button></div>`;
                            document.getElementById(`${respp.data.accountNo}-Accept`).addEventListener("click",(event)=>accept_func(event));
                            document.getElementById(`${respp.data.accountNo}-Reject`).addEventListener("click",(event)=>reject_func(event));
                        

                        });
}



const accept_func = (event) =>{
    const benaccno = event.target.id.split("-")[0];
    console.log(benaccno);
    
    var formdata = new FormData();
    formdata.append("accountNo",benaccno);
    formdata.append("status","APPROVED");
    axios.post("http://localhost:8080/bank/updateAccount",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        if(res.data===true){
            toast.success("Account Approved Successfully !");
        }else{
            toast.error("Internal Server Error !")
        }
    });
    };




const reject_func = (event) =>{
    const benaccno = event.target.id.split("-")[0];
    console.log(benaccno); 
    var formdata = new FormData();
    formdata.append("accountNo",benaccno);
    formdata.append("status","REJECTED");
    axios.post("http://localhost:8080/bank/updateAccount",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        if(res.data===true){
            toast.success("Account Rejected Successfully !");
        }else{
            toast.error("Internal Server Error !")
        }
    });
}


const logout_func = () =>{
    window.localStorage.setItem('username',"");
    window.location.href="/";
    
};
const editprofile_func = () => {
    window.location.href="/editprofile";
};

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
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/admindashboard"}>Dashboard</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/approvebeneficiaries"}>Approve Beneficiaries</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/updateloanstatus"}>Update Loan Status</div> 
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/approveaccount"}>Approve Account</div> 
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/allCustomerList"}>View Customers</div> 
                
                </div>
            </div>
            <div  id="content">
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Hey, Welcome to BankGO!</h1>
                <h1 class="text-2xl pt-3">Your One Stop Destination to make Your Banking Easy!</h1>
                
                </div>

                <div class="text-left pl-10 pt-16">
                    <table id="accounts">
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Pan Card No</th>
                            <th>Aadhar Card No</th>
                            <th>Account Type</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default ApproveAccount;