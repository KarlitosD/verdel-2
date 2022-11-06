export default function useSections(listId) {
    const {data : sections} = useSWR(`/api/lists/${listId}/sections`)
    return{sections}
}