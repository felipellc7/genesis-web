import { useForm, Resolver } from 'react-hook-form';
import useLogin from "@Hooks/useLogin"
import SessionWrapper from "@Hoc/SessionWrapper"
import WithAuthSync from '@Hoc/WithAuthSync'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req, res}: any) => {
  const {cookies} = req
  console.log("cookies", cookies)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }

  return { props: {  } }
}


type FormValues = {
  user: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.user ? values : {},
    errors: !values.user
      ? {
          user: {
            type: 'required',
            message: 'This is required.',
          },
          password: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

const LoginScreen = () => {
  const {onLogin} = useLogin()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => onLogin(data));

  return (
    <SessionWrapper>
      <form onSubmit={onSubmit}>
        <input {...register("user")} placeholder="User" />
        {errors?.user && <p>{errors.user.message}</p>}
        
        <input {...register("password")} placeholder="Pass" type="password" />

        <input type="submit" />
      </form>
    </SessionWrapper>
  );
}

export default LoginScreen