import { signIn } from "next-auth/react"
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import Image from "next/image"

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center bg-green-300">
        <div className="bg-white mx-auto max-w-md py-8 px-10 shadow rounded-lg">
          <div className="mb-4">
            <Image
              src="/img/box.png"
              width={250}
              height={250}
            />
          </div>
          <p className="font-semibold text-center mb-2 font-lg">Inicia sesion con: </p>
          <div className="mb-4">
            <button onClick={() => signIn('google')} className="inline-block w-full px-8 py-4 leading-none text-white bg-green-500 hover:bg-green-600 font-semibold rounded shadow">Google</button>
          </div>
        </div>
      </div>
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
