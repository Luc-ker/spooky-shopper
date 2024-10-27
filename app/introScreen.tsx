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
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    image: {
        height: 150,
        width: 150,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        resizeMode: 'cover', 
    },
    button: {
        backgroundColor: '#fd7801',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFA303',
        elevation: 3,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    header: {
        color: '#FFA303',
        padding: 5,
        fontSize: 30,
        fontFamily: "Magnificent Serif",
        paddingBottom: 20,
        fontWeight: '600', 
        textAlign: 'center',
    },
    scrollView: {
        padding: 5,
        minWidth: 300,
        maxHeight: 400,
        backgroundColor: '#FFF3E0',
        borderRadius: 10,
        elevation: 3, 
    },
});


export default App;