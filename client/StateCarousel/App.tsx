import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StateCarousel from "./src/StateCarousel";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //A property can be used to hide the name on the screen. 
        //I do not remember the exact name, but something similar to hideHeader
        //Updated this after stopping the recording
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="States" component={StateCarousel}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;