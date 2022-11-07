import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "/pages/api/auth/[...nextauth]";

const classesButton = "px-8 py-4 leading-none text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded shadow text-lg"

export default function List({ list }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const title = `Invitacion a la lista ${ list.name }`
    const hasSelf = list?.users.some(user => user.id === session?.user?.id)
    
    const enterList = () => {
        setLoading(true)
        fetch(`/api/lists/${list.id}/members`, { method: "POST" })
            .then(() => {
                router.push("/" + list.id)
            })
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <meta name="description" content="Generated by create next app" /> */}
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className="h-screen grid place-content-center bg-gray-200 dark:bg-gray-900">
                <div className="w-72 h-96 text-center bg-white rounded-md p-4 flex flex-col justify-center gap-4">
                    <h1 className="text-gray-900 text-2xl font-semibold">{ hasSelf ? "Ya sos miembra de esta lista" : "Aun no sos miembra de esta lista" } </h1>
                    {
                        hasSelf
                            ? <Link href={`/${list.id}`}>
                                <a className={classesButton}>Ir a la lista</a>
                            </Link>
                            : <button className={classesButton} onClick={enterList} disabled={loading}>Entrar a la lista</button>
                    }
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    const { listId } = context.query;
    const res = await fetch(`http://localhost:3000/api/lists/${listId}?include=users`, {
        headers: {
            Cookie: context.req.headers.cookie,
        },
    });
    const list = await res.json();
    return {
        props: {
            list,
            session
        },
    };
}
