import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';

const Stack = createStackNavigator();

export default () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: false,
                    headerTintColor: "#FFF",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#312e38"
                    },
                    headerLeftContainerStyle: {
                        marginLeft: 20,
                    }
                }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTransparent: true,
                        title: ''
                    }}
                />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
