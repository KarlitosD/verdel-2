import useSWR from "swr"

export default function useProducts(sectionId, prefetchProducts = null){
    const { products, mutate } = useSWR(`/api/sections/${sectionId}/products`, null, {
        fallbackData: prefetchProducts,
        revalidateOnMount: false,
        refreshInterval: 30000 //Refresh every 30 seconds 
    })

    const addProduct = (newProduct) => {
        fetch("/api/products", {
            method: "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newProduct,
                sectionId
            })
        }).then(() => mutate())
    }

    const editProduct = (productId, attributeChanged) => {
        fetch("/api/products/" + productId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributeChanged)
        }).then(() => mutate())
    }

    const deleteProduct = (productId) => {
        fetch("/api/products/" + productId, {
            method: "DELETE",
        }).then(() => mutate())
    }

    return { products, loading: !products, addProduct, editProduct, deleteProduct }
}