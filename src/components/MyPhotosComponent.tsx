import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { NavigationStackProp } from 'react-navigation-stack';


import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage from "react-native-flash-message";
import Geolocation from '@react-native-community/geolocation';

import ImageAddressComponent from './ImageAddressComponent'
import { PhotoAddress } from '../interfaces/rootInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
    navigation: NavigationStackProp;
};

const MyPhotosComponent = ({ navigation }: Props) => {
    const [photo, setPhoto] = useState([{}])
    const photosCity = useSelector((state: PhotoAddress) => state.photoCity);

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('myPhotos', value)
            console.log('Succesfully wrote image to AsyncStorage')
        } catch (e) {
            console.log('Async storage error: ', e)
        }
    }

    const clearAppData = async function () {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            console.log('Should have removed Asynx Storage')
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }

    const getData = async () => {
        try {
            const value: any = await AsyncStorage.getItem('myPhotos')
            const asyncPhotos = JSON.parse(value);
            setPhoto([...asyncPhotos])
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const chooseImg = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                const jsonValue = JSON.stringify([...photo, {
                    uri: res.data,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    fileName: res.fileName
                }])
                storeData(jsonValue);
                setPhoto([...photo, {
                    uri: res.data,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    fileName: res.fileName
                }])
            }
        });
    };

    const renderItemFunc = ({ item, index }: { item: any, index: number }) => {
        if (item.uri) {
            const { uri, latitude, longitude } = item;

            return <ImageAddressComponent uri={uri} latitude={latitude} longitude={longitude} photoAddress={photosCity} index={index} navigation={navigation} />
        } else {
            return null
        }
    };

    return (
        <View style={styles.container}>
            {photo.length === 1 ? <Text style={styles.addPhotoTextStyle}>Add new photo ⇲</Text> : null}
            <FlatList
                data={photo}
                renderItem={renderItemFunc}
                keyExtractor={(item: any, index) => (item.fileName + index).toString()}
            />
            <TouchableOpacity style={styles.plusIcon} onPress={chooseImg}>
                {
                    photo.length === 1 ? <Text style={{ paddingRight: 10 }}>Add photo</Text> : null
                }
                <Icon
                    name="pluscircle"
                    size={50}
                    color="#009688"
                />
            </TouchableOpacity>
            <FlashMessage position="bottom" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    plusIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addPhotoTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: '65%'
    },
    textLocationStyle: {
        flex: 1,
        flexWrap: 'wrap'
    }
})

export default MyPhotosComponent;