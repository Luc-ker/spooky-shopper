import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
    import { useFonts, YatraOne_400Regular } from '@expo-google-fonts/yatra-one'
import { SafeAreaView } from 'react-native-safe-area-context';

const App = ({navigation}) => {
    let [loaded] = useFonts({
        YatraOne_400Regular
    });
    
    if (!loaded) {
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
        borderWidth: 2,
        borderColor: 'gray',
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
        fontFamily: "YatraOne_400Regular",
        paddingBottom: 70,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1
    }
});

export default App;