import { useState } from "react"
import { useSession } from "next-auth/react"

const newList = {
    name: "SomeList"
}

const newSection = {
    name: "New Section",
    color: "emerald"
}

const editSectionData = {
    name: "Other name section"
}

const ButtonTest = ({ children, className, ...props }) => <button className="border border-black p-1" {...props}>{children}</button>

const fetchTest = (endpoint, options) => {
    const { method } = options
    if(method === "POST" || method === "PUT" || method === "PATCH" ){
        options = { ...options, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(options.body) }
    }
    return fetch(endpoint, options).then(res => res.json())
}

function ListTest({ data, listId }) {
    const createList = () => {
        fetchTest("/api/lists", { method: "POST", body: newList })
            .then(console.log)
    }

    const enterList = () => {
        fetchTest("/api/lists/" + listId, {method: "POST", body: { userId: data.user.id }})
            .then(console.log)
    }
    
    const getMyLists = () => {
        fetchTest("/api/lists")
            .then(console.log)
    }

    return (
        <div className="flex gap-4">
            <h3>Lists</h3>
            <ButtonTest onClick={createList}>Crear Lista</ButtonTest>
            <ButtonTest onClick={enterList}>Entrar en una Lista</ButtonTest>
            <ButtonTest onClick={getMyLists}>Obtener mis listas</ButtonTest>
        </div>
    )
}


export default function Test() {
    const { data } = useSession()
    const [listId, setListId] = useState("")
    const [sectionId, setSectionId] = useState("")

    const createSection = () => {
        fetchTest("/api/sections", { method: "POST", body: {...newSection, listId } })
            .then(console.log)
    }

    const getSections = () => {
        fetchTest(`/api/lists/${listId}/sections`)
            .then(console.log)
    }

    const deleteSection = () => {
        fetchTest(`/api/sections/${sectionId}`, { method: "DELETE" })
            .then(console.log)
    }

    const editSection = () => {
        fetchTest(`/api/sections/${sectionId}`, { method: "PATCH", body: editSectionData })
            .then(console.log)
    }

    return (
        <div className="p-4 flex flex-col gap-2">
            <input className="border-b border-blue-600" placeholder="List id" value={listId} onChange={e => setListId(e.target.value)} />
            <input className="border-b border-blue-600" placeholder="Section id" value={sectionId} onChange={e => setSectionId(e.target.value)} />
            <ListTest data={data} listId={listId} sectionId={sectionId} />
            <div className="flex gap-4">
                <h3>Sections</h3>
                <ButtonTest onClick={createSection}>Crear Seccion</ButtonTest>
                <ButtonTest onClick={getSections}>Obtener Secciones</ButtonTest>
                <ButtonTest onClick={deleteSection}>Eliminar seccion</ButtonTest>
                <ButtonTest onClick={editSection}>Editar seccion</ButtonTest>
            </div>
        </div>
    )
}
