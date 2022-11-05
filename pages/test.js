// const newProduct = {}

import { useSession } from "next-auth/react"

const newList = {
    name: "SomeList"
}

export default function Test(){

    const { data } = useSession()
    // console.log(data?.user)

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
        fetch("/api/lists/" + listId , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: data.user.id })
        })
        .then(res => res.json())
        .then(console.log)
    }

    return (
        <>
            <div>
                <button onClick={createList}>Crear Lista</button>
            </div>
            <form onSubmit={enterList}>
                <input type="text" placeholder="List id" name="id"/>
                <button>Entrar en una Lista</button>
            </form>
        </>
    )
}