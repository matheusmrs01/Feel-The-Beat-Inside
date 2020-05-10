import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';

const Stack = createStackNavigator();

export default ({ isSignedIn = false }) => {
    const stackNavigationOption = {
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
    }
    return (
        <NavigationContainer>
            {isSignedIn ? (
                <Stack.Navigator screenOptions={stackNavigationOption}>
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            ) : (
                    <Stack.Navigator screenOptions={stackNavigationOption}>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerTransparent: true,
                                title: ''
                            }}
                        />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    )
}
