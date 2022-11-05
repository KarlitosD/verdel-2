import { useState } from "react"
import { useSession } from "next-auth/react"

const newList = {
    name: "SomeList"
}

const newSection = {
    name: "New Section",
    color: "emerald"
}

function ListTest({ data }) {
    const createList = () => {
        fetch("/api/lists", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newList)
        })
            .then(res => res.json())
            .then(console.log)
    }

    const enterList = (event) => {
        event.preventDefault()
        const listId = event.target.id.value
        fetch("/api/lists/" + listId, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: data.user.id })
        })
            .then(res => res.json())
            .then(console.log)
    }

    const getMyLists = () => {
        fetch("/api/lists")
            .then(res => res.json())
            .then(console.log)
    }

    return (
        <div className="flex gap-4">
            <h3>Lists</h3>
            <div>
                <button className="border border-black p-1" onClick={createList}>Crear Lista</button>
            </div>
            <form onSubmit={enterList} className="border border-black p-1">
                <input type="text" placeholder="List id" name="id" className="border-b border-blue-600 mr-1" />
                <button>Entrar en una Lista</button>
            </form>
            <div>
                <button className="border border-black p-1" onClick={getMyLists}>Obtener mis listas</button>
            </div>
        </div>
    )
}


export default function Test() {
    const { data } = useSession()
    const [listId, setListId] = useState("")

    const createSection = () => {
        fetch("/api/sections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...newSection,
                listId
            })
        })
        .then(res => res.json())
        .then(console.log)
    }

    const getSections = () => {
        fetch(`/api/lists/${listId}/sections`)
            .then(res => res.json())
            .then(console.log)
    }

    return (
        <div className="p-4 flex flex-col gap-2">
            <input type="text" name="id" className="border-b border-blue-600" placeholder="List id" onChange={e => setListId(e.target.value)} />
            <ListTest data={data} />
            <div className="flex gap-4">
                <h3>Sections</h3>
                
                <button className="border border-black p-1" onClick={createSection}>Crear Lista</button>
                <button className="border border-black p-1" onClick={getSections}>Obtener listas</button>

            </div>
        </div>
    )
}