import React from 'react';

import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartGameScreen from './screens/StartGameScreen.js';
import GameScreen from './screens/GameScreenFunctional.js';
import GameOverScreen from './screens/GameOverScreen.js';

function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer> 
<Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component = {StartGameScreen} />
    <Stack.Screen name="GameScreen" component = {GameScreen}  />
    <Stack.Screen name="GameOverScreen" component={GameOverScreen} />
</Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
