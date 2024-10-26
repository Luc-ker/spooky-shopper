const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getRecipes() {
    console.log(`${apiUrl}/recipes`)
    const fetchResult = await fetch(`${apiUrl}/recipes`)
    return fetchResult.json()
}