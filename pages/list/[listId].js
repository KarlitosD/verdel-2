
export default function List({ list = [] }){
    return (
        <>
            { list.sections.map((section) => (
                <div key={section.id}>{section.name}</div>
            )) }
        </>
    )
}

export async function getServerSideProps(context){
    const { listId } = context.params
    const res = await fetch("http://localhost:3000/api/lists/" + listId)
    const list = await res.json()
    return {
        props: {
            list
        }
    }
}