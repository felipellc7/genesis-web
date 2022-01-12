import { useState, useEffect } from "react"
import { myAccountInfo } from "@Services/userServices"
import useTokenSettings from "@Hooks/useTokenSettings"
import useLogin from "@Hooks/useLogin"

const useMyAccountInfo = () => {
  const [user, setUser] = useState<any>()
  const {token, newCancelToken} = useTokenSettings()
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
  return user
}

export default useMyAccountInfo