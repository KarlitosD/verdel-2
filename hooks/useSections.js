import useSWR from "swr"

export default function useSections(listId, prefetchSections = null) {
    const { data : sections, error, isValidating } = useSWR(`/api/lists/${listId}/sections`, null,{
        fallbackData: prefetchSections,
        revalidateOnMount: false,
        refreshInterval: 30000
    })
    const addSection = (newSection) => {
        fetch("/api/sections", {
            method: "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newSection,
                listId
            })
        }).then(() => mutate())
    }

    const editSection = (sectionId, attributeChanged) => {
        fetch("/api/sections/" + sectionId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributeChanged)
        }).then(() => mutate())
    }

    const deleteSection = (sectionId) => {
        fetch("/api/sections/" + sectionId, {
            method: "DELETE",
        }).then(() => mutate())
    }

    return { sections, loading: !sections, addSection, editSection, deleteSection }
}