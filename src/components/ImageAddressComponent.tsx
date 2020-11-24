import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { photosGeoLoc } from '../interfaces/rootInterfaces';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
    uri: string;
    latitude: number;
    longitude: number;
    photoAddress: photosGeoLoc[];
    index: number;
    navigation: NavigationStackProp;
};

export default function ImageAddressComponent({ uri, latitude, longitude, photoAddress, index, navigation } : Props) {
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
                animationDuration: 350,
                duration: 850
            });
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchablePart}
                onPress={findMapLocation}
            >
                <Image style={styles.imageStyle} source={{ uri: 'data:image/jpeg;base64,' + uri }} />
                <View style={styles.addressStyle}>
                    {photoAddress[index] ?
                        <View style={{flex: 1}}>
                            <Text>Location: {photoAddress[index].photoCity}</Text>
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
