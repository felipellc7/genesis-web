import { useState, useEffect } from "react"
import { myAccountInfo } from "@Services/userServices"
import useCancelToken from "./useCancelToken"

const useGetMyAccountInfo = () => {
  const [user, setUser] = useState<any>()
  const {newCancelToken} = useCancelToken()
  let token: string

  useEffect(() => getMyInfo(), [])
  
  const getMyInfo = async () => {
    try {
      const response = await myAccountInfo(token, newCancelToken())
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  return {
    user
  }

}

export default useGetMyAccountInfo