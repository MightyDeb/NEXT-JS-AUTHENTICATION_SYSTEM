'use client'

import { userRegistrationFormControls, initialSignUpFormData } from "@/utils"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUserAction } from "@/actions"
import { useRouter } from "next/navigation"

export default function SignUp(){
  const [signUpFormData, setSignUpFormData]= useState(initialSignUpFormData)
  const router= useRouter()

  function handleSignUpBtnValid(){
    return Object.keys(signUpFormData).every(key=> signUpFormData[key].trim() !== '')
  }

  async function handleSignUp(){
    const result= await registerUserAction(signUpFormData)
    console.log(result)
    if(result?.data) router.push('/sign-in')
  }

  return(
    <div>
      <h1>Welcome to Registration</h1>
      <form action={handleSignUp}>
        {
          userRegistrationFormControls.map(item=>
            <div>
              <Label>{item.label}</Label>
              <Input name={item.name} id={item.name} placeholder={item.placeholder} type={item.type} value={signUpFormData[item.name]} onChange={(event)=> setSignUpFormData({
                ...signUpFormData,
                [event.target.name]: event.target.value
              })}/>
            </div>
          )
        }
        <Button type="submit"  disabled={!handleSignUpBtnValid()}className="disabled:opacity-65" >Sign Up</Button>
      </form>
    </div>
  )
}