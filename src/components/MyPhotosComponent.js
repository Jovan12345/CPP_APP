import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';


import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage from "react-native-flash-message";
import Geolocation from '@react-native-community/geolocation';

import ImageAddressComponent from './ImageAddressComponent'


const MyPhotosComponent = ({ navigation }) => {
    const [photo, setPhoto] = useState({})
    const myPhotos = useSelector((state) => state.photos);
    const photosCity = useSelector((state) => state.photoCity);

    const dispatch = useDispatch();

    const photoData = myPhotos.map(photoDetails => photoDetails.photoData)

    useEffect(() => {
        if (Object.keys(photo).length !== 0) {

            dispatch({ type: "ADD_PHOTO", payload: photo })
        }
    }, [photo])

    const chooseImg = () => {
        var options = {
            title: 'Select Image',
            mediaType: "photo",
            cameraType: "back",
            allowsEditing: true,
            maxWidth: 8000,
            maxHeight: 8000,
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
                console.log('Result type', res.sourceType)
                Geolocation.getCurrentPosition(gps => {
                    const latitude = res.latitude ? res.latitude : gps.coords.latitude;
                    const longitude = res.longitude ? res.longitude : gps.coords.longitude;
                    setPhoto({
                        uri: res.uri,
                        latitude: latitude,
                        longitude: longitude,
                        fileName: res.fileName
                    })
                }, (err) => {
                    setPhoto({
                        uri: res.uri,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        fileName: res.fileName
                    })
                })

            }
            


        });
    };

    const renderItemFunc = ({ item, index }) => {
        const { uri, latitude, longitude } = item;

        return <ImageAddressComponent uri={uri} latitude={latitude} longitude={longitude} photosCity={photosCity} index={index} navigation={navigation} />
    };

    return (
        <View style={styles.container}>
            {photoData.length === 0 ? <Text style={styles.addPhotoTextStyle}>Add new photo ⇲</Text> : null}
            <FlatList
                data={photoData}
                renderItem={renderItemFunc}
                keyExtractor={(item, index) => item.fileName + index}
            />
            <TouchableOpacity style={styles.plusIcon} onPress={chooseImg}>
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
        right: 15
    },
    addPhotoTextStyle: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: '50%'
    }
})

export default MyPhotosComponent;