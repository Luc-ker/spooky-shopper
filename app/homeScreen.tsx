import { getItemsFromQuery } from '@/api/shop';
import { addItemToShoppingList, getShoppingList } from '@/store/basket';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';

type Food = {
  id: number;
  item: string;
  aisle: string;
  price: number;
  row: number;
  column: number;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    padding: 10,
    height: 40,
    marginBottom: 5,
    minWidth: 300,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 3,
  
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    color: 'black',
    textAlign: 'center',
  },
  scrollView: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    minWidth: 300,
    maxHeight: 400
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  }
})

export default function({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Food[]>([]);
  const [text, setText] = useState('');

  const getItems = async (query: string) => {
    try {
      const result = await getItemsFromQuery(1, query);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setTextProxy = async (text: string) => {
    setText(text)
    await getItems(text)
  }
  
  useEffect(() => {
    getItems("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          marginTop: 0,
          justifyContent: "center",
          alignItems: "center"
          }}
      >
        <Text style={styles.header}>Add Your Items</Text>
        <TextInput style={styles.input} placeholder='Search for your item...' onChangeText={newText => setTextProxy(newText)} />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={styles.scrollView}>
          {
            data.map((item, index) => (
              <TouchableOpacity style={styles.listItem} key={index} onPress={async () => {
                await addItemToShoppingList(item);
              }}>
                <Text style={styles.listItemText}>{`${item.item}, £${item.price.toFixed(2) ?? (0).toFixed(2)}`} </Text>
              </TouchableOpacity>
            ))
          }

          </ScrollView>
        )}

        <TouchableOpacity style={{
          marginTop: 100,
          backgroundColor: '#fd7801',
          paddingVertical: 15,
          paddingHorizontal: 90,
          marginBottom: 10,
          borderRadius: 60,
          borderWidth: 1,
          borderColor: '#db7f2c',
        }} onPress={() => navigation.push('shoppingList')}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};