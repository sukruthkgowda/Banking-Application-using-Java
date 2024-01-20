import React,{useState,useEffect,useRef} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./trns.css";
import axios from 'axios';
import Logo from "./Common/logo2.png";

const TransferMoney = () => {

    const [user,setuser] = useState({});
    const [ben,setben] = useState({});
    const [accs,setaccs] = useState([]);

    var username = window.localStorage.getItem("username");
    var customerId = window.localStorage.getItem("customerId");
    const hasMounted = useRef(false);
    useEffect(()=>{
        if(!hasMounted.current){hasMounted.current=true;
        var fdata = new FormData();
        fdata.append("CustomerId",customerId);
        axios.post("http://localhost:8080/customer/checkAccount",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);


            if(res.data==="NOTFOUND"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Please Create your Bank Account to enable Features !</h1><button class='bg-[#2F4266] text-white ml-10 px-20 py-3 mt-10 rounded-md hover:cursor-pointer hover:bg-[#425475]' id='gotoaddaccount'>Add Account</button>";
                document.getElementById("gotoaddaccount").addEventListener("click",()=>{
                    window.location.href="/createaccount";
                });
                return;
            }else if(res.data==="APPROVED"){
                
            }else if(res.data==="REJECTED"){
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Rejected by Admin !</h1>";
            }else{
                document.getElementById("content").innerHTML="<h1 class='pt-32 pl-40 text-left text-4xl'>Your Account is Pending for Approval !</h1>";
            }



            var fdata = new FormData();
            fdata.append("customerId",customerId);
            axios.post("http://localhost:8080/customer/getallbeneficiaries",fdata,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
            console.log(res);
            
            var selectBox = document.getElementById("beneficiary");
            
            for(var j=0;j<res.data.length;j++){

                if(res.data[j].status==="ACCEPTED"){
                var option = document.createElement("option");
                option.text = res.data[j].beneficiaryName;
                option.value = res.data[j].beneficiaryName;
                accs.push({Name:res.data[j].beneficiaryName,Account:res.data[j].accountNo});
                selectBox.add(option);
                }
            }
        });


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
    if(id==="amount"){
        setben((olddata)=>({...olddata,amount:event.target.value}));
    }else if(id==="desc"){
        setben((olddata)=>({...olddata,description:event.target.value}));
    }else if(id==="password"){
        setben((olddata)=>({...olddata,password:event.target.value}));
    }
};

const submitHandler = () =>{
    console.log(ben);
   
    var selectBox = document.getElementById("beneficiary");
    var selectedOption = selectBox.options[selectBox.selectedIndex];
    if(selectedOption.value==="#"){
        toast.error("Please Select Beneficiary !");
        return;}
    
    var toaccount = selectedOption.value;
    var toaccno=0;
    for(var k=0;k<accs.length;k++){
        if(accs[k].Name===toaccount){
            toaccno=accs[k].Account;
        }
    }


    console.log(selectedOption);
    var dat = new FormData();
    dat.append("customerId",customerId);
    dat.append("Amount",ben.amount);
    dat.append("Description",ben.description);
    dat.append("Password",ben.password);
    dat.append("ToAccount",toaccno);
    console.log(dat);
    console.log(toaccno);

    axios.post("http://localhost:8080/customer/transfermoney",dat,{headers:{"Access-Control-Allow-Origin":"*"}}).then((res)=>{
        console.log(res);

        if(res.data==="UserNotFound"){
            toast.error("Your Account is not found !");}
        else if(res.data==="WrongPassword"){
            toast.error("Wrong Password !");}
        else if(res.data==="FromAccountNotFound"){
            toast.error("Your Account is not found !");
        }else if(res.data==="LowBalance"){
            toast.error("Your Account does not have sufficient funds to transfer !");
        }else if(res.data==="TransactionDone"){
            toast.success("Transaction Successfull !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }else if(res.data==="ToAccountNotFoundAddedtoGlobal"){
            toast.success("Transfer to other bank will happen in due time !");
            setTimeout(() => {window.location.href = "/userdashboard";},3000);
        }else if(res.data==="ToAccountNotFound"){
            toast.error("Amount Deducted but Global Transaction Error !");
        }

});

}


return (
    <div class="bg-[#ECEFF5]">
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
            <div id="content">
                <div class="pt-10 pl-10 text-left">
                <h1 class="text-4xl">Transfer Money!</h1>
                <h1 class="text-2xl pt-3">Note: You Can transfer money only to the beneficiaries you have already added !</h1>
                </div>

                <div class="text-left pl-10 pt-16">
                <table id="trnstable"> 
                    <tr>
                        <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Choose Beneficiary:</label></td>
                        <td id="trnstabletd"><select id="beneficiary" class="ml-6 w-80 h-10 rounded-md px-6">
                            <option value="#">Select a Beneficiary</option>
                            </select></td>
                    </tr>
                    <tr class="py-8">
                        <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Transfer Amount:</label></td>
                        <td id="trnstabletd"><input type="text" id="amount" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Transfer Amount'></input></td>
                    </tr>
                    <tr class="py-8">
                    <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Description:</label></td>
                    <td id="trnstabletd"><input type="text" id="desc" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Description'></input></td>
                    </tr>
                    <tr class="py-8">
                    <td id="trnstabletd"><label class="text-2xl w-8/12 px-10 py-10 mb-10">Enter Your Password:</label></td>
                    <td id="trnstabletd"><input type="text" id="password" onChange={(event)=>{changeHandler(event)}} class="ml-6 w-80 h-10 rounded-md px-6" placeholder='Enter Your Password'></input></td>
                    </tr>
                    <tr>
                        <td id="trnstabletd" colSpan={2} class="items-center"><button onClick={submitHandler} class="bg-[#2F4266] text-white ml-32 mt-4 w-8/12 px-16 py-2 rounded-md hover:cursor-pointer hover:bg-[#425475]">Transfer Money</button></td>
                    </tr>
                    </table>
                </div>

            </div>
        </div>
    </div>
);

    
};

export default TransferMoney;