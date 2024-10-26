import { getItemsFromQuery } from '@/api/shop';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

type Food = {
  id: string;
  item: string;
  aisle: string;
  price: number;
  row: number;
  column: number;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    marginBottom: 5,
    minWidth: 300
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: 'black',
    paddingLeft: 10,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 3,
    borderRadius: 4,
  },
  listItemText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    minWidth: 300,
    maxHeight: 200
  }
})

const App = () => {
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
          justifyContent: "center",
          alignItems: "center"
          }}>
        <TextInput style={styles.input} placeholder='Enter item' onChangeText={newText => setTextProxy(newText)} />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={styles.scrollView}>
          {
            data.map((item, index) => (
              <TouchableOpacity style={styles.listItem} key={index}>
                <Text style={styles.listItemText}>{`${item.item}, £${item.price.toFixed(2) ?? (0).toFixed(2)}`} </Text>
              </TouchableOpacity>
            ))
          }

          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default App;