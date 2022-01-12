import type { NextPage } from 'next'
import WithAuthSync from '@Hoc/WithAuthSync'
import useLogin from "@Hooks/useLogin"
import useMyAccountInfo from "@Hooks/useMyAccountInfo"

const Home: NextPage = () => {
  const user = useMyAccountInfo()
  const { onLogOut } = useLogin()
  return (
    <>
      <h1>Hola Mundo!</h1><br/>
      <hr />
      <h4>Nombre: {user?.first_name}</h4>
      <h4>Apellido: {user?.last_name}</h4>
      <h4>Correo: {user?.email}</h4>
      <h4>DNI: {user?.dni}</h4>
      <h4>Rol: {user?.role}</h4>
      <hr />
      <button onClick={() => onLogOut()}>Salir!</button>
    </>
  )
}

export default WithAuthSync(Home)
