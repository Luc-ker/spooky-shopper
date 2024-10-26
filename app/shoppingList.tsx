import MapComponent from '@/components/MapComponent';
import { getShoppingList, removeItemFromShoppingList } from '@/store/basket';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

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
    marginTop: 20,
    minWidth: 300,
    maxHeight: 400
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },

  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
  },

  removeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
})

const App = ({navigation}) => {
  const [data, setData] = useState<Food[]>([]);

  const updateBasket = async () => {
    setData(await getShoppingList())
  }

  useEffect(() => {
    updateBasket()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          justifyContent: "center",
          alignItems: "center"
          }}>
        <Text style={styles.header}>Review your basket</Text>
        <TextInput style={styles.input} placeholder='Enter item' />
        {
          <ScrollView style={styles.scrollView}>
          {
            data.map((item, index) => (
              <View style={styles.listItem} key={index}>
                <Text style={styles.listItemText}>{`${item.item}, £${item.price.toFixed(2) ?? (0).toFixed(2)}`} </Text>
                <TouchableOpacity style={styles.removeButton} onPress={async () => {
                    await removeItemFromShoppingList(index);
                    updateBasket();
                }}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          }
          </ScrollView>
        }

        <TouchableOpacity style={{
          backgroundColor: 'green',
          paddingHorizontal: 50,
          paddingVertical: 15,
          marginTop: 100,
        }} onPress={() => navigation.push('mapScreen')}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;