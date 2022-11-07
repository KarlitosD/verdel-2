import { useState } from "react";
import Head from "next/head";
import Menu from "components/Menu";
// import styled from "styled-components"
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import useSections from "hooks/useSections";
import Header from "components/Header";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div className="min-h-screen inline-flex w-full justify-center bg-gray-200">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Header/>
        <Menu />
        <main className="w-full ml-5 p-2">
          <div
            className={`bg-orange-600 w-3/4 mx-auto rounded-lg overflow-hidden h-fit px-2 py-3`}
          >
            <div className="flex items-center px-5 relative">
              <div className="flex gap-4 items-center">
                <input type="text" className="rounded-lg h-8 w-60"></input>
                <button className="rounded-lg flex items-center">
                  <PencilSquareIcon className="h-6 w-6 transition stroke-white hover:stroke-neutral-900" />
                </button>
              </div>
              <button
                onClick={() => setIsVisible((isVisible) => !isVisible)}
                className="text-center h-6 text-white hover:text-neutral-900 absolute mt-1 left-1/2 -translate-x-1/2"
              >
                <ChevronDownIcon
                  className={`h-6 w-6 transition duration-200 stroke-current ${
                    isVisible ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
            <div
              className={`bg-gray-700 w-full rounded-lg mt-3 px-5 py-7 text-center text-white ${
                isVisible ? "block" : "hidden"
              }`}
            >
              <button className="h-10 w-80 bg-trasparent  rounded-lg flex-1 mx-auto my-5 outline outline-offset-2 outline-orange-600 text-lg font-bold font-mono hover:bg-gray-800">
                <p>Nuevo producto (っ◔◡◔)っ</p>
              </button>
              <div className="bg-orange-600 rounded-lg flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="rounded-lg h-8 max-w-100"
                  ></input>
                  <button className="w-6 h-6 rounded-lg">
                    <PencilSquareIcon className="h-6 w-6 transition stroke-current hover:stroke-neutral-900" />
                  </button>
                </div>
                <button className="w-6 h-6 rounded-lg">
                  <TrashIcon className="h-6 w-6 transition stroke-current hover:stroke-neutral-900" />
                </button>
              </div>
            </div>
          </div>
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
    props: { session },
  };
};
