'use client'

const { Button } = require("../ui/button")
const { logoutAction } = require("@/actions")

export function Logout(){
  async function handleLogout(){
    await logoutAction()
  }
  return(
    <Button onclick={()=>handleLogout()}>Logout</Button>
  )
}

