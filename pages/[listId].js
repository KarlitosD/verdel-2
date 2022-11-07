import useSections from "hooks/useSections";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export default function List({ lists }) {
    const router = useRouter();
    const { listId } = router.query;
    const { sections, loading } = useSections(listId, lists);
    if (loading) return <p>Loading...</p>;
    console.log(sections);
    return <h1>Hola nizzo</h1>;
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    const listId = context.query
    const res = await fetch(`http://localhost:3000/api/lists/${listId}/sections`,{
        headers: {
            Cookie: context.req.headers.cookie
        }
    })
    const lists = await res.json()
    console.log({ lists, listId })
    return { 
        props: {
            lists
        }
    }
}
