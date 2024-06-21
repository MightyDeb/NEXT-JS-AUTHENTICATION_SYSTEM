import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//middleware action allows you to run code before a request is completed. Then based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
export function middleware(req){
  const path= req.nextUrl.pathname;
  const checkPublicPath = path === '/sign-up' || path === '/sign-in'
  const getCookies= cookies()
  const token= getCookies.get("token")?.value || ""
  if(checkPublicPath && token !== ''){
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  if(!checkPublicPath && token===''){
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }
}
//matcher allows you to filter middleware to run on specific paths
export const config = {
  matcher: ['/sign-in','/sign-up']
}

//if the user is already authenticated, then the sign-in and sign-up router is automatically redirected to home page because of the middleware