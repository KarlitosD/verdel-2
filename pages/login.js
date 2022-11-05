import { signIn } from "next-auth/react"
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

const Login = () => {
  return (
    <>
      <div class="min-h-screen flex flex-col justify-center bg-indigo-600">
        <div class="bg-white mx-auto max-w-md py-8 px-10 shadow rounded-lg">
          <div class="mb-4">
            <img src="/" alt=""/>
          </div>
          <form>
            <div class="mb-4">
              <button class="inline-block w-full px-8 py-4 leading-none text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded shadow">¡Inicia sesión!</button>
            </div>
          </form>
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
