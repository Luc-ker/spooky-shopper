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
        const fetchResult = await fetch(`${apiUrl}/getItemsFromQuery`, {
            method: "POST",
            body: JSON.stringify({
                storeId,
                query
            })
        })
        
        return fetchResult.json();
    } catch {
        return null
    }
}