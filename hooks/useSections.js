import useSWR from "swr"

export default function useSections(listId, prefetchData = null) {
    const { data : sections, error } = useSWR(`/api/lists/${listId}/sections`, null,{
        fallbackData: prefetchData
    })
    return{ sections, loading: !sections, error }
}