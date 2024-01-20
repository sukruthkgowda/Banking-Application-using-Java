import React,{useState} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from "./Common/dash.jpg";
import Logo2 from "./Common/logo2.png";
import "./drp.css";

const Login = () => {
    const [data,setdata] = useState({});
    const submitHandler = () =>{
        console.log(data);

        var formdata = new FormData();
        
        formdata.append("Username", data.Username);
        formdata.append("Password", data.Password);

        axios.post("http://localhost:8080/customer/login",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            var dd = res.data.split(",")[0];
            if(dd==="correctPassword"){
                window.localStorage.setItem("username",data.Username);
                console.log(res.data.split(",")[1]);
                window.localStorage.setItem("customerId",res.data.split(",")[1]);
                toast.success("Login Successfull !");
                setTimeout(() => {window.location.href = "/userdashboard";},3000);
                
            }else if(dd === "userNotRegistered"){
                toast.error("You haven't Registered yet !");
            }else if(dd === "wrongPassword"){
                toast.error("Wrong Password !");
            }

        });
    };
    const changeHandler = (event) => {
        console.log(event.target.value);
        if(event.target.id === 'username'){
            setdata((olddata)=>({...olddata,Username:event.target.value}));
        }else if(event.target.id === 'password'){
            setdata((olddata)=>({...olddata,Password:event.target.value}));
        }
    };

    return (
        <>
        <ToastContainer/>
           <div class="flex flex-row w-screen h-screen">
            <div class="absolute w-36 h-32 rounded-md mt-4 mx-4">
            <img src={Logo2}></img>
            </div>
            <div class="w-8/12 h-full">
                <img src={Logo}  class="h-screen"></img>
            </div>
                <div class="w-4/12 pt-40 bg-gray-200 px-10 py-5">
                    <h1 class="font-semibold text-left text-3xl mt-4 py-4 mb-5">Login To Your Account</h1>
                    
                        <input type="text" onChange={(event)=>changeHandler(event)} id="username" placeholder="Enter Your Username" class="float-left w-10/12 h-10 px-8 rounded-lg" required></input><br />
                        <input type="password" onChange={(event)=>changeHandler(event)} id="password" placeholder="Enter Your Password" class="float-left w-10/12 h-10 px-8 rounded-lg mt-4" required></input><br />
                        <input type="submit"  class="bg-[#2F4266] text-white float-left ml-10 mt-8 mb-3 px-24 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]" onClick={submitHandler}></input><br />
                        <div><br/><br/><br/><br/><br/><p class="float-left ml-4 text-gray-400 opacity-70 hover:text-[#2F4266] hover:underline hover:cursor-pointer" onClick={()=>{window.location.href="/register"}} >Don't Have an Account Yet? Register Now</p><br/>
                        </div>
                </div>
            </div>

        </>
    );
};


export default Login;