import React,{useState} from 'react';
import axios from 'axios';
import IMAGE from "./Common/register.jpg"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Regis = () => {
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
        formdata.append("Aadhaar", data.Aadhar);
        formdata.append("PanCard", data.PanCardNo);


        axios.post("http://localhost:8080/customer/register",formdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{console.log(res);
        
        if(res.data===true){
            toast.success("Registration Successfull !");
            setTimeout(() => {window.location.href = "/";},3000);
        }else if(res.data===false){
            toast.error("Internal Server Error !")
        }else {
            toast.error("Username Taken !")
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
        }else if(event.target.id === 'username'){
            setdata((olddata)=>({...olddata,Username:event.target.value}));
        }else if(event.target.id === 'password'){
            setdata((olddata)=>({...olddata,Password:event.target.value}));
        }else if(event.target.id === 'Aadhar'){
            setdata((olddata)=>({...olddata,Aadhar:event.target.value}));
        }else if(event.target.id === 'PanCardNo'){
            setdata((olddata)=>({...olddata,PanCardNo:event.target.value}));
        }
    };

    return (
        <div class="flex flex-row">
            <ToastContainer/>
            <div class="bg-black w-8/12 h-screen">
                <img src={IMAGE} class="h-screen"></img>

            </div>


            <div class="flex h-screen w-4/12">
                <div class="w-full rounded-xl items-left">
                    <h1 class="font-semibold text-3xl text-center py-4 mt-10 mb-5 pr-72">Sign Up</h1>
                    
                        <input type="text" onChange={(event)=>changeHandler(event)} id="name" placeholder="Enter Your Name" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="phn" placeholder="Enter Your Phone Number" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="Email" placeholder="Enter Your Email" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="Address" placeholder="Enter Your Address" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="Aadhar" placeholder="Enter Your Aadhar Card No" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="PanCardNo" placeholder="Enter Your Pan Card No" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="username" placeholder="Enter Your Username" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="text" onChange={(event)=>changeHandler(event)} id="password" placeholder="Enter Your Password" class="h-10 px-1 mb-4 w-96 border-b-2 border-black mr-2" required></input><br />
                        <input type="submit"  class="bg-[#2F4266] text-white float-left ml-10 mt-5 mb-3 px-16 py-2 rounded-3xl hover:cursor-pointer hover:bg-[#425475]" onClick={submitHandler} value="Register"></input><br />
                        <a class="float-left ml-16 pt-1 text-gray-400 opacity-85 hover:text-[#2F4266] hover:underline hover:cursor-pointer hover:text-md transition ease-in-out" href = "/">Sign In &rarr;</a>
                    
                </div>
            </div>

            </div>
    );

};
export default Regis;