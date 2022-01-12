import { useState, useEffect } from "react"
import { myAccountInfo } from "@Services/userServices"
import useCancelToken from "./useCancelToken"
import useLogin from "@Hooks/useLogin"

const useSessionValidator = (token: string) => {
  const [user, setUser] = useState<any>()
  const {newCancelToken} = useCancelToken()
  const { onLogOut } = useLogin()

  useEffect(() => {
    getMyInfo()
  }, [token])
  
  const getMyInfo = async () => {
    try {
      const {data: {message}} = await myAccountInfo(token, newCancelToken())
      setUser(message)
    } catch (error) {
      onLogOut()
    }
  }
  
  return {
    user
  }

}

export default useSessionValidator