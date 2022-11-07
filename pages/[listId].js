import useSections from "hooks/useSections"
import { useRouter } from "next/router"

export default function List({  }){
    const router = useRouter()
    const { listId } = router.query
    const { sections, loading } = useSections(listId)
    if(loading) return <p>Loading...</p>
    console.log(sections)
    return (
        <h1>Hola nizzo</h1>
    )   
}

export async function getServerSideProps(context){
    return { props: {} }
}