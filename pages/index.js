import Head from "next/head";
import Menu from "components/Menu";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import Header from "components/Header";


export default function Home() {
  return (
    <>
      <Head>
        <title>Verdel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="min-h-screen inline-flex w-full justify-center">
        <Menu />
        <main className="w-full bg-gray-200 dark:bg-gray-900">
          <Header />
          <div className=" w-60 h-60 mb-4 block flex-1 mx-auto my-5">
            <Image src="/img/boxx.png" width={250} height={250} alt="" />
          </div>
          <p className="font-semibold text-center mb-2 font-lg">
            Bienvenido
          </p>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
