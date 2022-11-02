export const localStorageProvider = () =>  {
    // When initializing, we restore the data from `localStorage` into a map.
    let map = new Map()

    if(typeof window === undefined){
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

export function fetcher(...args) {
    return fetch(...args).then(res => res.json())
}