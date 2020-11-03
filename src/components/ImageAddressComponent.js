import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useDispatch} from 'react-redux';

export default function ImageAddressComponent({ uri, latitude, longitude, photosCity, index }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (latitude, longitude) {
            dispatch({
                type: 'ADD_ADDRESS',
                payload: { latitude: latitude, longitude: longitude },
            });
        }
    }, []);

    if (photosCity.length!== 0) {
        console.log('Photos city', photosCity[index].photoCity)
    }


    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri }} />
            <View style={styles.addressStyle}>
                {latitude && longitude ?
                    <View>
                        <Text>Location: latitude={latitude} longitude={longitude}</Text>
                    </View>
                    :
                    <Text>Location: Location for this picture is not available</Text>}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginHorizontal: 10
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
