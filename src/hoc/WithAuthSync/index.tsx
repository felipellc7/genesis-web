import Cookies from "js-cookie"
import { validateToken } from "@Services/authServices"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WithAuthSync = (WrappedComponent: any) => {
  return (props: any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      verifyToken()
    }, []);
    
    const verifyToken = async () => {
      try {
        const accessToken = Cookies.get("token");
        // if no accessToken was found,then we redirect to "/" page.
        if (!accessToken) {
          Router.replace("/login");
        } else {
          // we call the api that verifies the token.
          await validateToken(accessToken);
          // if token was verified we set the state.
          setVerified(true);
        }
      } catch (error) {
        // If the token was fraud we first remove it from localStorage and then redirect to "/"
        Cookies.remove("token");
        Router.replace("/login");
      }
    }

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
}

export default WithAuthSync