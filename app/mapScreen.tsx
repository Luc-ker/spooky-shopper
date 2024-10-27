import { getPathFromitems } from '@/api/shop';
import MapComponent from '@/components/MapComponent';
import { getShoppingList } from '@/store/basket';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

export type FoodPosition = {
  name: string;
  x: number,
  y: number,
}

const App = () => {
  const [path, setPath] = useState<[any?]>()
  const [loaded, setLoaded] = useState<boolean>(false)

  const getShopping = async () => {
    let shoppingList = await getShoppingList();
    let path = await getPathFromitems(shoppingList);

    let pos: [any?] = []
    for (const [key, value] of Object.entries(path)) {
      pos.push([key, value[0], value[1]])
    }

    setPath(pos);

    setLoaded(true);
  }

  useEffect(() => {
    getShopping()
  }, [])

  if(loaded == false)
    return null;

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          justifyContent: "center",
          alignItems: "center"
          }}>
            <MapComponent points={path} />
      </View>
    </View>
  );
};

export default App;