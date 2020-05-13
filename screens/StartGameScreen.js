import React from 'react'
import {View, Button, Text, StyleSheet, StatusBar} from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';

function startGameScreen({navigation}) {
    return (
        
        <View>
       
        <View style={{marginTop:'5%', flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:30}}>Adventure Island</Text>
        </View>
        <View style={{marginTop: 50}}>
        <Button title="Start" onPress={()=> navigation.navigate('GameScreen')} />    
        </View>
        </View>
    )
}

export default startGameScreen
