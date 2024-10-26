import MapComponent from '@/components/MapComponent';
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
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  }
})

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Food[]>([]);
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          justifyContent: "center",
          alignItems: "center"
          }}>
        <Text style={styles.header}>Review your basket</Text>
        <TextInput style={styles.input} placeholder='Enter item' />
      </View>
    </View>
  );
};

export default App;