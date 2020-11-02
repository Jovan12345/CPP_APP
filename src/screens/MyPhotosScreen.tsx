import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MyPhotosComponent from '../components/MyPhotosComponent'

const MyPhotosScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            <Text>My Photos Screen</Text>
            <MyPhotosComponent />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default MyPhotosScreen;