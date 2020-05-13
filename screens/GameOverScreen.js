import React from 'react';
import {View, Text, Button} from 'react-native';

function GameOverScreen({navigation}) {
    return (
        <View>
            
        <View style={{marginTop:'5%', flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:30}}>Game Over Screen</Text>
        </View>
        <View style={{marginTop: 50}}>
        <Button title="Start" onPress={()=>{navigation.navigate('GameScreen')}}/>    
        </View>
        </View>
    )
}

export default GameOverScreen
