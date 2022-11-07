import { useEffect, useMemo } from "react";
import useSWR from "swr"

export default function useProducts(sectionId = null, prefetchProducts = null){
    const { data: products, error ,mutate } = useSWR(sectionId ? `/api/sections/${sectionId}/products` : null, null, {
        fallbackData: prefetchProducts,
        revalidateOnMount: !prefetchProducts,
        refreshInterval: 30000 //Refresh every 30 seconds 
    })

    const loading = useMemo(() => !products && !error, [products, error])

    useEffect(() => {
        error && console.error(error.info)
    }, [error])

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
        mutate(products.filter(product => product.id !== productId), { optimisticData: true, revalidate: false })
        fetch("/api/products/" + productId, {
            method: "DELETE",
        }).then(() => mutate())
    }

    return { products, loading, error, addProduct, editProduct, deleteProduct }
}