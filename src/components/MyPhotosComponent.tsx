import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { NavigationStackProp } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage from "react-native-flash-message";

import ImageAddressComponent from './ImageAddressComponent'
import { PhotoAddress } from '../interfaces/rootInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {
    navigation: NavigationStackProp;
};

const MyPhotosComponent = ({ navigation }: Props) => {
    const [photo, setPhoto] = useState([{}])
    const [loadingPhotos, setLoadingPhotos] = useState(true)
    const photosCity = useSelector((state: PhotoAddress) => state.photoCity);

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('myPhotos', value)
        } catch (e) {
            console.log('Error while storing in Async Storage: ', e)
        }
    }

    // If the async storage needs to be cleared, just place the clearAppData() in the useEffect hook
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
            if (value) {
                const asyncPhotos = JSON.parse(value);
                setPhoto([...asyncPhotos])
            }
            setLoadingPhotos(false)
        } catch (e) {
            // error reading value
            console.log('Error while reading myPhotos data from Async Storage: ', e)
        }
    }

    useEffect(() => {
        // clearAppData() // Enable only if you want to delete everything from the Async Storage
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
                console.log('Photo results', res)
                let jsonValue = [{}];
                // Geolocation is used as an alternative as the ImagePicker does not pick up the location every time
                Geolocation.getCurrentPosition(gps => {
                    const latitude = res.latitude ? res.latitude : gps.coords.latitude;
                    const longitude = res.longitude ? res.longitude : gps.coords.longitude;

                    jsonValue = ([...photo, {
                        uri: res.data,
                        latitude,
                        longitude,
                        fileName: res.fileName
                    }])
                    storeData(JSON.stringify(jsonValue));
                    setPhoto(jsonValue);
                    console.log('Okay block')
                }, e => {
                    jsonValue = ([...photo, {
                        uri: res.data,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        fileName: res.fileName
                    }])
                    storeData(JSON.stringify(jsonValue));
                    setPhoto(jsonValue)
                    console.log('Error block')

                })
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

    console.log(loadingPhotos)

    return (
        <View style={{ flex: 1 }}>
            {loadingPhotos ? <Spinner visible={loadingPhotos} textContent={'Loading...'}/> :
                <>
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
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
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
    },
    spinnerStyle: {
        alignSelf: 'center',
        marginTop: '65%'
    }
})

export default MyPhotosComponent;