import { useState } from "react"
import { ICredentials } from "@Interfaces/authInterface"
import { authenticateUser } from "@Services/authServices"
import useCancelToken from "./useCancelToken"

const useLogin = () => {
  const {newCancelToken} = useCancelToken()
  
  const onLogin = async (credentials: ICredentials) => {
    try {
      const response = await authenticateUser(credentials, newCancelToken())
      console.log(response)
      
    } catch (error) {
      console.log(error)
      
    }

  }
  return {
    onLogin
  }

}

export default useLogin