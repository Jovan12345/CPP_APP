import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyPhotosComponent from '../components/MyPhotosComponent';
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

const MyPhotosScreen = () => (
    <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="My photos">
            <Stack.Screen name="My photos" component={MyPhotosComponent} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    </View>
)


const styles = StyleSheet.create({

})

export default MyPhotosScreen;