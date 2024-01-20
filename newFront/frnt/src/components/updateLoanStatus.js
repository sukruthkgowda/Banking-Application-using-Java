import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./drp.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const UpdateLoanStatus = () => {
    var username = window.localStorage.getItem("username");

    const [user,setuser] = useState({});
    
    const hasMounted = useRef(false);

    const updateStatus = (event) => {
        const lid = event.target.id;
        const status = document.getElementById(lid+"-select").value;
        if(status==="#"){toast.error("Choose a Status value !");return;}
        var ldata = new FormData();
        ldata.append("LoanId",lid);
        ldata.append("Status",status);
        axios.post("http://localhost:8080/bank/UpdateLoanStatus",ldata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            if(res.data===true){
                toast.success("Status Updated Successfully");
                setTimeout(() => {window.location.href = "/updateloanstatus";},3000);
            }else{
                toast.error("Internal Server Error !");
            }
        });
        
    };



    useEffect(()=>{
        
        if(!hasMounted.current){
            hasMounted.current=true;

            axios.post("http://localhost:8080/bank/getAllCustomers",{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
                console.log(res);

                for(var i=0;i<res.data.length;i++){
                    var cid = res.data[i].customerID;
                    var fdata = new FormData();
                    fdata.append("CustomerId",cid);

                    var panCardNo = res.data[i].panCardNo;

                    axios.post("http://localhost:8080/customer/getAllLoans",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((resp)=>{
                        console.log(resp);
                        for(var j=0;j<resp.data.length;j++){
                            var table = document.getElementById("loansStatus");
                            var row=table.insertRow(-1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6);
                            var cell8 = row.insertCell(7);
                            var cell9 = row.insertCell(8);
                            var cell10 = row.insertCell(9);

                            cell1.innerHTML=cid;
                            cell2.innerHTML=panCardNo;
                            cell3.innerHTML=resp.data[j].loanID;
                            cell4.innerHTML=resp.data[j].loanType;
                            cell5.innerHTML=resp.data[j].amountRequested;
                            cell6.innerHTML=resp.data[j].interestRate;
                            cell7.innerHTML=resp.data[j].term;
                            cell8.innerHTML=resp.data[j].status;
                            cell9.innerHTML = `
                            <select id="${resp.data[j].loanID}-select">
                            <option value="#" label="Choose Status"></option>
                            <option value="PENDING" label="PENDING"></option>
                            <option value="INPROGRESS" label="INPROGRESS"></option>
                            <option value="ACCEPTED" label="ACCEPTED"></option>
                            <option value="REJECTED" label="REJECTED"></option>
                            </select>`;

                            cell10.innerHTML = `<button id="${resp.data[j].loanID}" class="bg-[#2F4266] text-white px-6 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Update</button>`;
                            
                            document.getElementById(`${resp.data[j].loanID}`).addEventListener("click",(event)=>updateStatus(event));
                        }
                    });

                }

                var table = document.getElementById("MyTable");
                {/* 
                for(var i=0;i<res.data.length;i++){
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);

                    cell1.innerHTML = res.data[i].customerId;
                    cell2.innerHTML = res.data[i].beneficiaryName;
                    cell3.innerHTML = res.data[i].beneficiaryBank;
                    cell4.innerHTML = res.data[i].bankIFSC;
                    cell5.innerHTML = res.data[i].accountNo;
                    cell6.innerHTML = `<div class="flex flex-row gap-3"><button id="${res.data[i].accountNo}-Accept" class="bg-[#2F4266] text-white ml-10 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Accept</button><button id="${res.data[i].accountNo}-Reject" class="bg-[#2F4266] text-white ml-10 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Reject</button></div>`;
                
                    document.getElementById(`${res.data[i].accountNo}-Accept`).addEventListener("click",(event)=>accept_func(event));
                    document.getElementById(`${res.data[i].accountNo}-Reject`).addEventListener("click",(event)=>reject_func(event));
                
                }
                */}
            });
        }
    },[]);

const accept_func = (event) =>{
    const benaccno = event.target.id.split("-")[0];
    console.log(benaccno);
    
    var formdata = new FormData();
    formdata.append("accountNo",benaccno);
    formdata.append("status","ACCEPTED");
    axios.post("http://localhost:8080/bank/updateBeneficiary",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        if(res.data===true){
            toast.success("Nominee Approved Successfully !");
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
    axios.post("http://localhost:8080/bank/updateBeneficiary",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        if(res.data===true){
            toast.success("Nominee Rejected Successfully !");
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
                <h1 class="text-4xl">Update Loan Status!</h1>
                <h1 class="text-2xl pt-3">Hey Admin, Go through the Customer Info and Update Loan Status Carefully!</h1>
                
                </div>

                <div class="text-left pl-10 pt-16">
                    <table id="loansStatus">
                        <tr>
                            <th>Customer ID</th>
                            <th>Pan Card No</th>
                            <th>Loan Id</th>
                            <th>Loan Type</th>
                            <th>Amount Requested</th>
                            <th>Interest Rate</th>
                            <th>Term</th>
                            <th>status</th>
                            <th>Choose Status</th>
                            <th>Update</th>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default UpdateLoanStatus;