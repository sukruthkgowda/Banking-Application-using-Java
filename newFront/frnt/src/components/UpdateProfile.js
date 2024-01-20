import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";

import axios from 'axios';

import Logo from "./Common/logo2.png";

const UpdateProfile = () => {
    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");

    const [user,setuser] = useState({});
    const [accn,setaccn] = useState({});
    const hasMounted = useRef(false);
    const [data,setdata] = useState({});

    const submitHandler = () =>{
        console.log(data);

        var formdata = new FormData();
        formdata.append("Name", data.Name);
        formdata.append("PhoneNumber", data.PhoneNumber);
        formdata.append("Email", data.Email);
        formdata.append("Address", data.Address);
        formdata.append("Username", data.Username);
        formdata.append("Password", data.Password);
        formdata.append("CustomerId", customerId);

        axios.post("http://localhost:8080/customer/updateProfile",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            if(res.data==="UsernameTaken"){
                toast.error("Username Already Taken !");
            }else if(res.data==="WrongPassword"){
                toast.error("Wrong Password !");
            }else if(res.data==="SomeError"){
                toast.error("Internal Server Error");
            }else if(res.data==="Updated"){
                toast.success("Profile Updated Successfully !");
                window.localStorage.setItem("username",data.Username);
                setTimeout(() => {window.location.href = "/userdashboard";},3000);
            }
        });
    };



    const changeHandler = (event) => {
        console.log(event.target.value);
        if(event.target.id === 'name'){
            setdata((olddata)=>({...olddata,Name:event.target.value}));
        }else if(event.target.id === 'phn'){
            setdata((olddata)=>({...olddata,PhoneNumber:event.target.value}));
        }else if(event.target.id === 'Email'){
            setdata((olddata)=>({...olddata,Email:event.target.value}));
        }else if(event.target.id === 'Address'){
            setdata((olddata)=>({...olddata,Address:event.target.value}));
        }else if(event.target.id === 'password'){
            setdata((olddata)=>({...olddata,Password:event.target.value}));
        }else if(event.target.id === 'username'){
            setdata((olddata)=>({...olddata,Username:event.target.value}));
        }
    };

    useEffect(()=>{
        
        if(!hasMounted.current){
            hasMounted.current=true;
            var fdataa = new FormData();
            fdataa.append("customerId",customerId);
            axios.post("http://localhost:8080/customer/getCustomerDetails",fdataa,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
                console.log(res);
                var par = document.getElementById("addData");
                par.innerHTML+=``;


                data.Cid=customerId;
                data.Name=res.data.name;
                data.aadhaarCardNo = res.data.aadhaarCardNo;
                data.panCardNo = res.data.panCardNo;
                data.PhoneNumber=res.data.phoneNumber;
                data.Email=res.data.email;
                data.Address=res.data.address;
                data.Username=res.data.username;
                data.Password="";


                document.getElementById("name").value=res.data.name;
                document.getElementById("phn").value=res.data.phoneNumber;
                document.getElementById("aadhaarcardno").value=res.data.aadhaarCardNo;
                document.getElementById("pancardno").value=res.data.panCardNo;
                
                document.getElementById("Email").value=res.data.email;
                document.getElementById("Address").value=res.data.address;
                document.getElementById("username").value=res.data.username;
               
            
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
        <div class="flex flex-row w-screen h-screen mt-2">
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
            <div  id="content" class="w-full">
                <div class="pt-10 pl-10 text-left" id="addData">
                <h1 class="text-4xl">Edit Profile!</h1>
                <h1 class="text-2xl pt-3">Note: You Can Edit only some of the Fields!</h1>
                
                </div>

                <div class="text-left pl-10 pt-4">
                <table class="w-8/12 mt-5 ml-60">
                <tr>
                <td id="trnstabletd"><label>Customer ID :</label></td><td id="trnstabletd">
                <input type="text" id="cid" onChange={(event)=>changeHandler(event)} class="border h-10 px-4 rounded-lg" value={customerId} required disabled></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Name : </label></td><td id="trnstabletd">
                <input type="text" id="name" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required disabled></input><br />
                </td></tr>
                
                <tr>
                <td id="trnstabletd"><label>Aadhaar Card No : </label></td><td id="trnstabletd">
                <input type="text" id="aadhaarcardno" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required disabled></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Pan Card No : </label></td><td id="trnstabletd">
                <input type="text" id="pancardno" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required disabled></input><br />
                </td></tr>

                <tr>
                <td id="trnstabletd"><label>Phone Number :</label></td><td id="trnstabletd">
                <input type="text" id="phn" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Email : </label></td><td id="trnstabletd">
                <input type="text"  id="Email" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Address : </label></td><td id="trnstabletd">
                <input type="text" id="Address" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Username : </label></td><td id="trnstabletd">
                <input type="text" id="username" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" required></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd"><label>Password : </label></td><td id="trnstabletd">
                <input type="text" id="password" onChange={(event)=>changeHandler(event)} class="h-10 px-4 rounded-lg" placeholder="Confirm Your Password" required></input><br />
                </td></tr>
                <tr>
                <td id="trnstabletd" colSpan={2}>
                <input type="submit" id="submitbtn" onClick={submitHandler} class="bg-[#2F4266] text-white ml-6 mt-4 w-7/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]"></input><br />
                </td></tr>
                </table>
                </div>

            </div>
        </div>
    </div>
);

};



export default UpdateProfile;