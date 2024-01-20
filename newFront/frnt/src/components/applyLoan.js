import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const ApplyLoan = () => {
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
    if(id==="lamount"){
        setdata((olddata)=>({...olddata,AmountRequested:event.target.value}));
    }else if(id==="lterm"){
        setdata((olddata)=>({...olddata,Term:event.target.value}));
    }else if(id==="nname"){
        setdata((olddata)=>({...olddata,Name:event.target.value}));
    }else if(id==="nphn"){
        setdata((olddata)=>({...olddata,PhoneNumber:event.target.value}));
    }else if(id==="naddress"){
        setdata((olddata)=>({...olddata,Address:event.target.value}));
    }else if(id==="nemail"){
        setdata((olddata)=>({...olddata,Email:event.target.value}));
    }else if(id==="nrelation"){
        setdata((olddata)=>({...olddata,Relation:event.target.value}));
    }
};


const submitHandler = () =>{
   
    var selectBox = document.getElementById("ltype");
    var selectedOption = selectBox.options[selectBox.selectedIndex];
    if(selectedOption.value==="#"){
        toast.error("Please Select Loan Type !");
        return;}
    
    var loanType = "Home Loan";
    var interestRate = 6;
   
    if(selectedOption.value==="Car Loan"){
        loanType = "Car Loan";
        interestRate = 9;
    }
    else if(selectedOption.value==="Education Loan"){
        loanType = "Education Loan";
        interestRate = 12;
    }



    var ldata = new FormData();
    ldata.append("CustomerId",customerId);
    ldata.append("Name",data.Name);
    ldata.append("PhoneNumber",data.PhoneNumber);
    ldata.append("Address",data.Address);
    ldata.append("Email",data.Email);
    ldata.append("Relation",data.Relation);
    ldata.append("LoanType",loanType);
    ldata.append("InterestRate",interestRate);
    ldata.append("Term",data.Term);
    ldata.append("AmountRequested",data.AmountRequested);

    




    axios.post("http://localhost:8080/customer/applyLoan",ldata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);

        if(res.data===true){
            toast.success("Loan Application Successfull !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }else{
            toast.error("Internal Server Error !");
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
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/loanapplications"}>Loan Applications</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/updatenominee"}>Update Nominee</div>
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/changepin"}>Change Pin</div>
                
                </div>
            </div>
            <div  id="content">
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Apply Loan Online !</h1>
                <h1 class="text-2xl pt-3">Note: After Applying for loan below do check all Loans Section for Loan Status Update !</h1>
                
                </div>

                <div class="text-left pl-32 pt-5">
                    <table>
                        <tr>
                            
                            <td id="#trnstabletd" colSpan={2}>
                                <select class="ml-0 w-8/12 h-10 rounded-md px-6" id="ltype">
                                    <option value="#">Select Loan Type</option>
                                    <option value="Home Loan">Home Loan - ( @ 6% )</option>
                                    <option value="Car Loan">Car Loan - ( @ 9% )</option>
                                    <option value="Education Loan">Education Loan - ( @ 12% )</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Loan Amount :</label></td>
                            <td id="trnstabletd"><input type="text" id="lamount" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Loan Amount"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Loan Term (in Years) :</label></td>
                            <td id="trnstabletd"><input type="text" id="lterm" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Loan Term"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Nominee Name:</label></td>
                            <td id="trnstabletd"><input type="text" id="nname" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Nominee Name"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Nominee Phone Number:</label></td>
                            <td id="trnstabletd"><input type="text" id="nphn" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Nominee Phone Number"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Nominee Address:</label></td>
                            <td id="trnstabletd"><input type="text" id="naddress" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Nominee Address "/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Nominee Email: </label></td>
                            <td id="trnstabletd"><input type="text" id="nemail" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Nominee Email"/></td>
                        </tr>
                        <tr>
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Relation to Nominee : </label></td>
                            <td id="trnstabletd"><input type="text" id="nrelation" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Relation to Nominee"/></td>
                        </tr>
                        <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Apply Loan</button></td>
                    </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default ApplyLoan;