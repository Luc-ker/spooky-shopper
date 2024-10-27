import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';


const App = ({navigation}) => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={[styles.container]}>
                <Image style={[styles.image]}
                source={require("../assets/images/logo.png")} />
                <View>
                    <Text style={[styles.header]}>Spooky Shopper</Text>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.push('homeScreen')}
                accessibilityLabel="Lets go shopping"
                >
                    <Text style={[styles.textButton]}>Begin</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4E3B2B',
        padding: 24,
        margin: 'auto',
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    image: {
        height: 250,
        width: 250,
    },
    button: {
        backgroundColor: '#fd7801',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFF',
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    header: {
        color: '#FFA303',
        padding: 5,
        fontSize: 45,
        fontFamily: "Magnificent Serif",
        paddingBottom: 20,
        fontWeight: 'bold', 
        textAlign: 'center',
    },
});


export default App;