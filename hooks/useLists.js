import { useEffect, useMemo } from "react";
import useSWRImmutable from 'swr/immutable'

export default function useLists(prefetchLists = []){
    const { data: lists, error, mutate } = useSWRImmutable("/api/lists")

    const loading = useMemo(() => !lists && !error, [lists, error])

    useEffect(() => {
        error && alert(error.info)
    }, [error])

    const addList = (newList) => {
        fetch("/api/lists/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newList)
        }).then(() => mutate())
    }

    const deleteList = (listId) => {
        fetch("/api/lists/" + listId, {
            method: "DELETE"
        }).then(() => mutate())
    }

    const editList = (listId, attributeChanged) => {
        fetch("/api/lists/" + listId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributeChanged)
        }).then(() => mutate())
    }

    return { lists, loading, error ,addList, deleteList, editList }
}