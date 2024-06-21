'use server'

import connectToDB from "@/database"
import User from "@/models"
import bcryptjs from "bcryptjs" 
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"


//register
export async function registerUserAction(formData){
  await connectToDB()
  try {
    const {userName, email, password}= formData
    //check whether user is already registered or not
    const checkUser= await User.findOne({email})
    if(checkUser){
      return{
        success: false,
        message: 'User already registered'
      }
    }
    //bcrypting the password
    const salt= await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    //creating the model of new user and saving 
    const newlyCreatedUser= new User({
      userName,
      email,
      password: hashedPassword
    })
    const savedUser = await newlyCreatedUser.save()
    if(savedUser){
      return{
        success: true,
        data: JSON.parse(JSON.stringify(savedUser))
      }
    }else{
      return{
        success: false,
        message: 'Some error popped out!'
      }
    }
  } catch (error) {
    console.log(error)
    return{
      success: false,
      message: 'Some error popped out!'
    }
  }
}


//login
export async function loginUserAction(formData){
  await connectToDB()
  try {
    const {email, password}= formData
    //check if user exists in db
    const checkUser= await User.findOne({email})
    if(!checkUser){
      return{
        success: false,
        message: "User doesn't exist! Please sign up"
      }
    }
    //check if password is valid or not
    const checkPassword = await bcryptjs.compare(password, checkUser.password)
    if(!checkPassword){
      return{
        success: false,
        message: "Password is incorrect"
      }
    }
    //create token data for sucessful sign-in
    const createdTokenData={
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    }
    const token= jwt.sign(createdTokenData, "DEFAULT_KEY", {expiresIn: '1d'})
    //store the token in cookie
    const getCookies= cookies()
    getCookies.set('token', token)
    return {
      success: true,
      message: 'Login is successful'
    }
  } catch (error) {
    console.log(error)
    return{
      success: false,
      message: 'Some error popped out!'
    }
  }
}


//fetching the data stored in cookies
export async function fetchAuthUserAction(){
  await connectToDB()
  try {
    //check for existence of token
    const getCookies = cookies()
    const token = getCookies.get("token")?.value || ""
    if(token === ""){
      return{
        success: false,
        message: "Token is invalid"
      }
    }
    //decoding of token if it exists
    const decodedToken= jwt.verify(token, 'DEFAULT_KEY')
    const getUserInfo= await User.findOne({_id: decodedToken.id})
    if (getUserInfo){
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo))
      }
    }else{
      return{
        success: false,
        message: 'Some error popped out!'
      }
    }
  } catch (error) {
    console.log(error)
    return{
      success: false,
      message: 'Some error popped out!'
    }
  }
}


//logout
export async function logoutAction(){
  const getCookies= cookies()
  //empty the cookie to remove authentication
  getCookies.set("token","")
}