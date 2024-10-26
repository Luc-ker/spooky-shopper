import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View, ScrollView, TextInput, StyleSheet} from 'react-native';
// import getRecipes from 'shop'; 

type Food = {
  id: string;
  name: string;
  aisle: string;
  price: number;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    marginBottom: 5
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  }
})

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Food[]>([]);

  const getFoods = async () => {
    try {
      const response = await fetch('data/test.json');
      const json = await response.json();
      setData(json.food);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1,
          padding: 24, 
          justifyContent: "center",
          alignItems: "center"}}>
        <TextInput style={styles.input} placeholder='Enter item'/>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <ScrollView style={{borderColor: "red",
                borderWidth: 1,
                maxWidth: 200
              }}>
                <Button title={ `${item.name}, £${item.price}` } color={"grey"}></Button>
              </ScrollView>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default App;