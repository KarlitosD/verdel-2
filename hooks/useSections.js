import { useEffect, useMemo } from "react";
import useSWR from "swr"

export default function useSections(listId = null, prefetchSections = null) {
    const { data: sections, error, mutate } = useSWR(listId ? `/api/lists/${listId}/sections` : null, null,{
        fallbackData: prefetchSections,
        revalidateOnMount: !prefetchSections,
        refreshInterval: 30000
    })

    const loading = useMemo(() => !sections && !error, [sections, error])

    useEffect(() => {
        error && console.error(error.info)
    }, [error])

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
        mutate(sections.filter(section => section.id !== sectionId), { optimisticData: true, revalidate: false })
        fetch("/api/sections/" + sectionId, {
            method: "DELETE",
        }).then(() => mutate())
    }

    return { sections, loading, error, addSection, editSection, deleteSection }
}