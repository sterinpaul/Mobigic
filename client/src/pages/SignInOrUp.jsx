import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import {
  Card
} from "@material-tailwind/react";
   
  const SignInOrUp = ()=>{
    const [signIn,setSignIn] = useState(true)
    return (
        <div className="h-screen flex items-center justify-center">
          <Card className="p-4 shadow-2xl shadow-blue-gray-500">
          {signIn ? 
            <>
            <SignInForm/>
            <button className="mt-2">
              Don't have an account ?
              <span onClick={()=>setSignIn(!signIn)} className="ml-1 text-blue-gray-900 transition-colors hover:text-gray-500">Sign up</span>
            </button>
            </>
             : 
            <>
            <SignUpForm/>
            <button className="mt-2">
              Already have an account ?
              <span onClick={()=>setSignIn(!signIn)} className="ml-1 text-blue-gray-900 transition-colors hover:text-gray-500">Login</span>
            </button>
            </>
            }
            </Card>
        </div>
    )
  }

export default SignInOrUp;