const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getRecipes() {
    try {
        const fetchResult = await fetch(`${apiUrl}/recipes`)
        return fetchResult.json()
    } catch {
        return {}
    }
}