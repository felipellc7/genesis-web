import { useEffect } from "react";
import Cookies from "js-cookie"
import Router from 'next/router';

export const onLogOut = () => {
  Cookies.remove('token')
  Router.push('/login')
}

export const auth = ({req, res}: any) => {
  const token = Cookies.get("token")
  console.log(token)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      res.writeHead(302, { Location: '/login' })
      res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
}

const WithAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === 'onLogOut') {
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('onLogOut')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: any) => {
    const token = auth(ctx)
    console.log("tokensito", token)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps }
  }
  return Wrapper
}

export default WithAuthSync