import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import { returnToHome } from './store/modules/playlist/actions';

import Login from './pages/Login';
import Home from './pages/Home';

const Stack = createStackNavigator();

export default ({ isSignedIn = false }) => {
    const isPlaylistTime = useSelector(state => state.playlist.isPlaylistTime)
    const dispatch = useDispatch()

    const homeOptions = isPlaylistTime ? {
        headerTransparent: true,
        title: '',
    } : {
            headerTransparent: false,
            title: 'Playlist',
            headerLeft: () => (
                <TouchableOpacity onPress={() => { dispatch(returnToHome()) }}>
                    <MaterialIcons
                        name="chevron-left"
                        size={40}
                        color="#fff"
                    />
                </TouchableOpacity>
            )
        };

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
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={homeOptions}
                    />
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
