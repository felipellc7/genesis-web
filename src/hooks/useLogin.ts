import { useState, useEffect } from "react"
import { ICredentials } from "@Interfaces/authInterface"
import { authenticateUser } from "@Services/authServices"
import useTokenSettings from "./useTokenSettings"
import Cookies from 'js-cookie'
import Router from 'next/router';
import { onLogOut } from "@Hoc/WithAuthSync"

const useLogin = () => {
  const [token, setToken] = useState<string>("")
  const {newCancelToken} = useTokenSettings()

  useEffect(() => setTokenOnCookies(), [token])
  
  const onLogin = async (credentials: ICredentials) => {
    try {
      const {data: {message: {access_token}}} = await authenticateUser(credentials, newCancelToken())
      setToken(access_token)
      Router.push("/")
    } catch (error) {
      console.log(error) 
    }
  }

  const setTokenOnCookies = () => {
    if (token) {
      Cookies.set("token", token)
    }
  }

  return {
    onLogin,
    onLogOut
  }

}

export default useLogin