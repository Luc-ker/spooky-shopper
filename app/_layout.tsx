import { createNativeStackNavigator } from '@react-navigation/native-stack';
import introScreen from './introScreen'
import homeScreen from './homeScreen'
import shoppingList from './shoppingList'
import calculatingScreen from './calculatingScreen'
import mapScreen from './mapScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='introScreen' component={introScreen} options={{headerShown: false}} />
      <Stack.Screen name='homeScreen' component={homeScreen} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='shoppingList' component={shoppingList} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}}} />
      <Stack.Screen name='mapScreen' component={mapScreen} options={{title: "Spooky Shopper", headerTitleStyle: {fontWeight: 'black', fontSize: 22}, headerBackButtonMenuEnabled: false}} />
      <Stack.Screen name='calculatingScreen' component={calculatingScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
