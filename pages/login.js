import { signIn } from "next-auth/react"
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

const Login = () => {
    return (
        <>
            <button onClick={() => signIn("google")}>Iniciar session con google</button>
        </>
    )
}

export const getServerSideProps = async context => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
        props: { session }
    }
}

export default Login
