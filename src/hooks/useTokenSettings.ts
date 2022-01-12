
import { useState, useEffect, useRef } from "react"
import axios, { CancelToken, CancelTokenSource } from "axios"
import Cookies from "js-cookie"

const useTokenSettings = () => {
  const [token] = useState<any>(Cookies.get("token"))
  const axiosSource = useRef<CancelTokenSource>()

  const newCancelToken = (): CancelToken => {
    axiosSource.current = axios.CancelToken.source()
    return axiosSource.current.token
  }

  useEffect(
    () => () => {
      if (axiosSource.current) axiosSource.current.cancel()
    },
    [],
  )

  return {
    newCancelToken,
    isCancel: axios.isCancel,
    token
  }
}

export default useTokenSettings