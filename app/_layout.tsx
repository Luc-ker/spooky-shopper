import { createNativeStackNavigator } from '@react-navigation/native-stack';
import homeScreen from './homeScreen';
import shoppingList from './shoppingList'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='homeScreen' component={homeScreen} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='shoppingList' component={shoppingList} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
    </Stack.Navigator>
  );
}
