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

const App = () => {
  const getShopping = async () => {
    let shoppingList = await getShoppingList();
    console.log(await getPathFromitems(shoppingList))
  }

  useEffect(() => {
    getShopping()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          justifyContent: "center",
          alignItems: "center"
          }}>
            <MapComponent />
      </View>
    </View>
  );
};

export default App;