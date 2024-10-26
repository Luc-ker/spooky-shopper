import AsyncStorage from '@react-native-async-storage/async-storage';

type Food = {
    id: number;
    item: string;
    aisle: string;
    price: number;
    row: number;
    column: number;
};

export async function setShoppingList(jsonToSet: any) {
    await AsyncStorage.setItem("shoppingList", JSON.stringify(jsonToSet ?? []))
}

export async function getShoppingList() {
    const jsonValue = await AsyncStorage.getItem("shoppingList");
    if (jsonValue == null)
        setShoppingList([])

    return jsonValue != null ? JSON.parse(jsonValue) : [];
}

export async function addItemToShoppingList(food: Food) {
    let shoppingList: [Food] = await getShoppingList()
    shoppingList.push(food)
}

export async function removeItemFromShoppingList(index: number) {
    let shoppingList: [Food] = await getShoppingList()
    shoppingList.splice(index, 1)
}