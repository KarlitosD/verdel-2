import useSWR from "swr"

export default function useSections(listId) {
    const { data : sections, error } = useSWR(`/api/lists/${listId}/sections`)
    return{ sections, loading: !sections, error }
}