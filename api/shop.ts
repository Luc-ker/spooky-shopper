import { Food } from "@/store/basket";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getRecipes() {
    try {
        const fetchResult = await fetch(`${apiUrl}/recipes`)
        return fetchResult.json()
    } catch {
        return {}
    }
}
;
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

        if (fetchResult.status != 200) {
            return []
        }

        fetchResult = await fetchResult.json();
        
        return fetchResult
    } catch(err) {
        return []
    }
}

export async function getPathFromitems(items: [Food]) {
    try {
        let fetchResult = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopping_list: items
            })
        })

        if (fetchResult.status != 200) {
            return []
        }

        fetchResult = await fetchResult.json();
        
        return fetchResult
    } catch(err) {
        return []
    }
}