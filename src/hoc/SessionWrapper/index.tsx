import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx

  const {cookies} = req
  console.log("cookies", cookies)

  return { props: {  } }
}

const SessionWrapper = ({children}: any) => {
  return <>{children}</>

}

export default SessionWrapper