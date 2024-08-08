import  JWT  from "jsonwebtoken";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address ,answer} = req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "Name is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
   
    //******Check user */

     
   
   const existingUser=await userModel.findOne({email})
 
//*******existing user
 if(existingUser){
return res.status(200).send({
 success:false,
 message:'Already registerd please Login'
})
}
 

///*********Registered User  hashed password */

const hashedPassword=await hashPassword(password)

//save inside database
const user= await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()

res.status(201).send({
 success:true,
 message:'User Register Successfully',
 user
})

} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Post Login Controller
export const loginController=async(req,res)=>{
 try {
    const {email,password}=req.body
    //Validation
  if(!email||!password){
res.status(404).send({
success:false,
message:"Invalid email or password"
})
}

//Now compaare hasspassword with normal password so we can write
// for check user is present or not

const user=await userModel.findOne({email})
if(!user){
return res.status(404).send({
success:false,
message:"Email is not register"
})
}
const match=await comparePassword(password,user.password)
//Validation
if(!match){
return res.status(200).send({
success:false,
message:"invalid password"
})
}
//Json Web token
const token =await JWT.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"7d",});

res.status(200).send({
success:true,
message:"Login Successfully",
user:{
  _id:user.id,
name:user.name,
email:user.email,
phone:user.phone,
address:user.address,
role:user.role,
},
 token,
 })

 } catch (error) {
    console.log(error)
   res.status(500).send({
 success:false,
 message:"Error in login",
 error
}) 
 }
}
//forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer })
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed })
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController=(req,res)=>{
res.send("protected Route")
}


//update profile controller

export const updateProfileController=async(req,res)=>{
   try {
    const{name,email,password,address,phone}=req.body
    const user=await userModel.findById(req.user._id)
    //password 
    if(password && password.length <6){
    return res.json({error:'Password is required and 6 character long'})
    }
    const hashedPassword=password? await hashPassword(password) :undefined

    const updatedUser=await userModel.findByIdAndUpdate(req.user._id,{
    name:name||user.name,
    password:hashedPassword||user.password,
    phone:phone||user.phone,
    address:address||user.address
    
    },{new:true})
    res.status(200).send({
    success:false,
    message:"Profile updated successfully",
    updatedUser
    })
   } catch (error) {
    console.log(error)
    res.status(400).send({
    success:false,
    message:"Error while Update Profile"
    })
   }
}

//orders controller

export const getOrdersController=async(req,res)=>{
      try {
        const orders=await orderModel.find({buyer:req.user?._id}).populate("products","-photo").populate("buyer","name")
        res.json(orders)
      } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        message:"Error while getting Order",error
        })
      }
}
//get all order in admin 
export const getAllOrdersController=async(req,res)=>{
  try {
    const orders=await orderModel.find({}).populate("products","-photo").populate("buyer","name")
    .sort({createdAt:"-1"})
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
    success:false,
    message:"Error while getting Order",error
    })
  }
}
//order status controller
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};