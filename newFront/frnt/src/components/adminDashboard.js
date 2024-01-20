import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./drp.css";
import Logo from "./Common/logo2.png";
import axios from 'axios';



const AdminDashboard = () => {
    var username = window.localStorage.getItem("username");

    const [user,setuser] = useState({});
    
    const hasMounted = useRef(false);
    useEffect(()=>{
        
        if(!hasMounted.current){
            hasMounted.current=true;
        }
    },[]);


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
                <div class="py-3 text-left pl-5 hover:bg-[#ECEFF5] hover:cursor-pointer" onClick={()=>window.location.href="/userdashboard"}>Dashboard</div>
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
                    <h1 class="text-xl pt-3">Hey Admin!</h1>
                    <h1 class="text-xl pt-3">Choose the Action from Left to get Started !</h1>
                    
                </div>

            </div>
        </div>
    </div>
);

};



export default AdminDashboard;