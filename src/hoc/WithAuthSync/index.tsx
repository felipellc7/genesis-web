import { useEffect } from "react";
import Cookies from "js-cookie"
import Router from 'next/router';

export const onLogOut = () => {
  Cookies.remove('token')
  Router.push('/login')
}

export const auth = async ({req, res}: any) => {
  try {
    const { token } = await req?.cookies
    if (!token) {
      if (typeof window === 'undefined') {
        res.writeHead(302, { Location: '/login' })
        res.end()
      } else {
        Router.push('/login')
      }
    }
    return token
  } catch (error) {
    return null
  }
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
    const token = await auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps }
  }
  return Wrapper
}

export default WithAuthSync