import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";


export default function ImageAddressComponent({ uri, latitude, longitude, photosCity, index, navigation }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'ADD_ADDRESS',
            payload: { latitude: latitude, longitude: longitude },
        });
    }, []);

    const findMapLocation = () => { 
        if (latitude && longitude) {
            navigation.navigate('Map', {
                uri: uri,
                latitude: latitude,
                longitude: longitude
            })
        } else {
            showMessage({
                message: "There is no location info",
                type: "info",
                animationDuration: 500,
                duration: 8850
            });
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchablePart}
                onPress={findMapLocation}
            >
                <Image style={styles.imageStyle} source={{ uri }} />
                <View style={styles.addressStyle}>
                    {photosCity[index] ?
                        <View>
                            <Text>Location: {photosCity[index].photoCity}</Text>
                        </View>
                        :
                        <Text>Location: Loading...</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginHorizontal: 10,
    },
    touchablePart: {
        flex: 1,
        flexDirection: "row",
    },
    imageStyle: {
        justifyContent: "flex-start",
        width: 150,
        height: 150,
        margin: 10
    },
    addressStyle: {
        alignSelf: "center",
        paddingLeft: 10
    }
})
