'use client'
import { userLoginFormControls, initialLoginFormData } from "@/utils"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUserAction } from "@/actions"
import { useRouter } from "next/navigation"

export default function SignUp(){
  const [loginFormData, setLoginFormData]= useState(initialLoginFormData)
  const router= useRouter()

  function handleLoginBtnValid(){
    return Object.keys(loginFormData).every(key=> loginFormData[key].trim() !== '')
  }

  async function handleSignIn(){
    const result= await loginUserAction(loginFormData)
    console.log(result)
    if(result) router.push('/')
  }

  return(
    <div>
      <h1>Welcome to Login</h1>
      <form action={handleSignIn}>
        {
          userLoginFormControls.map(item=>
            <div key={item.name}>
              <Label>{item.label}</Label>
              <Input name={item.name} id={item.name} placeholder={item.placeholder} type={item.type} value={loginFormData[item.name]} onChange={(event)=> setLoginFormData({
                ...loginFormData,
                [event.target.name]: event.target.value
              })}/>
            </div>
          )
        }
        <Button type="submit"  disabled={!handleLoginBtnValid()}className="disabled:opacity-65" >Sign In</Button>
      </form>
    </div>
  )
}