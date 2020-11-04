import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import MyPhotosComponent from '../components/MyPhotosComponent';
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

// Stack navigator is used to enable the user to switch screens whenever he clicks on the photos with available location
const MyPhotosScreen = () => (
    <View style={styles.container}>
        <Stack.Navigator initialRouteName="My photos">
            <Stack.Screen name="My photos" component={MyPhotosComponent} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    </View>
)


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MyPhotosScreen;