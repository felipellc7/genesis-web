
import { useEffect, useRef } from "react"
import axios, { CancelToken, CancelTokenSource } from "axios"

const useCancelToken = () => {
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
  }
}

export default useCancelToken