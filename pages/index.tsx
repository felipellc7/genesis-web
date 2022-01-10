import type { NextPage } from 'next'
import WithAuthSync from '@Hoc/WithAuthSync'
import useLogin from "@Hooks/useLogin"

const Home: NextPage = () => {
  const { onLogOut } = useLogin()
  return (
    <>
      <h1>Hello, Next.js!</h1><br/>
      <button onClick={() => onLogOut}>Salir!</button>
    </>
  )
}

export default WithAuthSync(Home)
