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
        const fetchResult = await fetch(`${apiUrl}`, {
            method: "POST",
            body: JSON.stringify({
                item: query
            })
        }).then(response => response.json());

        if (fetchResult.status != 400) {
            return []
        }
        
        return fetchResult
    } catch(err) {
        console.log(err)
        return []
    }
}