const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getRecipes() {
    try {
        const fetchResult = await fetch(`${apiUrl}/recipes`)
        return fetchResult.json()
    } catch {
        return {}
    }
}

export async function getItemsFromQuery(storeId: number, query: string) {
    try {
        let fetchResult = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: query
            })
        })

        console.log(fetchResult.status)
        if (fetchResult.status != 200) {
            console.log("bad status")
            return []
        }

        fetchResult = await fetchResult.json();
        
        return fetchResult
    } catch(err) {
        console.log(err)
        return []
    }
}