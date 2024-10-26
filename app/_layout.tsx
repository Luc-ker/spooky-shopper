import { createNativeStackNavigator } from '@react-navigation/native-stack';
import homeScreen from './homeScreen';
import shoppingList from './shoppingList'
import calculatingScreen from './calculatingScreen'
import mapScreen from './mapScreen'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='homeScreen' component={homeScreen} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='shoppingList' component={shoppingList} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='mapScreen' component={mapScreen} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='calculatingScreen' component={calculatingScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
