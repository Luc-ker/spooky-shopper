import { useFonts } from 'expo-font';
import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const App = ({navigation}) => {
    const [loaded, error] = useFonts({
        'Magnificent-Serif': require('../assets/fonts/mag.ttf'),
      });
    
      if (!loaded && !error) {
        return null;
      }
    
    return (
        <SafeAreaView style={styles.scrollView}>
            <View style={[styles.container]}>
                <Image style={[styles.image]}
                source={require("../assets/images/logo.png")} />
                <View>
                    <Text style={styles.header}>Spooky Shopper</Text>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.push('homeScreen')}
                accessibilityLabel="Lets go shopping"
                >
                    <Text style={[styles.textButton]}>Begin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B1B00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: 250,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginBottom: 10,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#db7f2c',
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    header: {
        color: '#FFA303',
        padding: 5,
        marginTop: 0,
        fontSize: 45,
        fontFamily: "Magnificent-Serif",
        paddingBottom: 70,
        fontWeight: 'bold', 
        textAlign: 'center',
    },
    scrollView: {
        flex: 1
    }
});

export default App;