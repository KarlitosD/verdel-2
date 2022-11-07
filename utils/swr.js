export const localStorageProvider = () => {
    // When initializing, we restore the data from `localStorage` into a map.
    let map = new Map()

    if (typeof window === undefined) {
        console.log("Cliente")
        new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
        // Before unloading the app, we write back all the data into `localStorage`.
        window.addEventListener('beforeunload', () => {
            const appCache = JSON.stringify(Array.from(map.entries()))
            localStorage.setItem('app-cache', appCache)
        })
    }

    // We still use the map for write & read for performance.
    return map
}

export async function fetcher(...args) {
    const res = await fetch(...args)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}