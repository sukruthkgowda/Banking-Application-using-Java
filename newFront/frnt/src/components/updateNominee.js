import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const UpdateNominee = () => {
    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");

    const [data,setdata] = useState({});
    const [accn,setaccn] = useState({});
    const hasMounted = useRef(false);

    useEffect(()=>{
        
        if(!hasMounted.current){hasMounted.current=true;
        

        var fdata = new FormData();
        fdata.append("CustomerId",customerId);
        axios.post("http://localhost:8080/customer/getLoans",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);

            var selectBox = document.getElementById("lapp");

            for (var i = 0; i < res.data.length; i++) {
                var option = document.createElement("option");
                option.value = res.data[i];
                option.text = res.data[i];
                selectBox.appendChild(option);
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


const submitHandler = () =>{
   
    var selectBox = document.getElementById("lapp");
    var selectedOption = selectBox.options[selectBox.selectedIndex];
    if(selectedOption.value==="#"){
        toast.error("Please Select Loan Application !");
        return;}
    
    var loanId = selectedOption.value;



    var ldata = new FormData();
    ldata.append("CustomerId",customerId);
    ldata.append("Name",data.Name);
    ldata.append("PhoneNumber",data.PhoneNumber);
    ldata.append("Address",data.Address);
    ldata.append("Email",data.Email);
    ldata.append("Relation",data.Relation);
    ldata.append("LoanId",loanId);
    ldata.append("Password",data.Password);

    




    axios.post("http://localhost:8080/customer/updateNomineeLoan",ldata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);

        if(res.data==="WrongPassword"){
            toast.error("Incorrect Password !");
            
        }else if(res.data==="SomeError"){
            toast.error("Internal Server Error !");
        }
        else{
            toast.success("Nominee Updated Successfully !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }

});

}

const changeHandler = (event) => {
    const id = event.target.id;
    if(id==="nname"){
        setdata((olddata)=>({...olddata,Name:event.target.value}));
    }else if(id==="nphn"){
        setdata((olddata)=>({...olddata,PhoneNumber:event.target.value}));
    }else if(id==="naddress"){
        setdata((olddata)=>({...olddata,Address:event.target.value}));
    }else if(id==="nemail"){
        setdata((olddata)=>({...olddata,Email:event.target.value}));
    }else if(id==="nrelation"){
        setdata((olddata)=>({...olddata,Relation:event.target.value}));
    }else if(id==="password"){
        setdata((olddata)=>({...olddata,Password:event.target.value}));
    }
};

const getNomineeDetails = () => {
    var selectBox = document.getElementById("lapp");
    var val = selectBox.options[selectBox.selectedIndex].value;
    var fdata = new FormData();
    fdata.append("LoanId",val);
    axios.post("http://localhost:8080/customer/getNomineeLoanDetails",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);
        document.getElementById("nname").value=res.data.name;
        document.getElementById("nphn").value=res.data.phoneNumber;
        document.getElementById("naddress").value=res.data.address;
        document.getElementById("nemail").value=res.data.email;
        document.getElementById("nrelation").value=res.data.relation;

        data.Name=res.data.name;
        data.PhoneNumber=res.data.phoneNumber;
        data.Address=res.data.address;
        data.Email=res.data.email;
        data.Relation=res.data.relation;


    });
    

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
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Update Nominees !</h1>
                <h1 class="text-2xl pt-3">Note: Choose a Nominee Below to get started !</h1>
                
                </div>

                <div class="text-left pl-10 pt-4">
                    <div id="insertData" class="pt-3">
                    <table id="nominees">
                    <tr>
                            
                            <td id="trnstabletd" colSpan={2}>
                                <select class="ml-32 w-8/12 h-10 rounded-md px-6" id="lapp" onChange={getNomineeDetails}>
                                    <option value="#">Select Loan Application</option>
                                    
                                </select>
                            </td>
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
                            <td id="trnstabletd"><label  class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Your Password : </label></td>
                            <td id="trnstabletd"><input type="text" id="password" class="ml-6 w-80 h-10 rounded-md px-6" onChange={changeHandler} placeholder="Enter Your Account's Password"/></td>
                        </tr>
                        <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Update Nominee</button></td>
                    </tr>
                    </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

};



export default UpdateNominee;