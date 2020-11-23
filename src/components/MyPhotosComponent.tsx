import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { NavigationStackProp } from 'react-navigation-stack';


import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage from "react-native-flash-message";
import Geolocation from '@react-native-community/geolocation';

import ImageAddressComponent from './ImageAddressComponent'
import { Photo, PhotoAddress, photoData } from '../interfaces/rootInterfaces';


type Props = {
    navigation: NavigationStackProp;
};

const MyPhotosComponent = ({ navigation }: Props) => {
    const [photo, setPhoto] = useState({})
    console.log("Photo", photo)
    const myPhotos = useSelector((state: Photo) => state.photos);
    const photosCity = useSelector((state: PhotoAddress) => state.photoCity);

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
                // Geolocation is used as an alternative as the ImagePicker does not pick up the location every time
                Geolocation.getCurrentPosition(gps => {
                    const latitude = res.latitude ? res.latitude : gps.coords.latitude;
                    const longitude = res.longitude ? res.longitude : gps.coords.longitude;
                    setPhoto({
                        uri: res.data,
                        latitude: latitude,
                        longitude: longitude,
                        fileName: res.fileName
                    })
                }, (err) => {
                    setPhoto({
                        uri: res.data,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        fileName: res.fileName
                    })
                })

            }
        });
    };



    const renderItemFunc = ({ item, index }: { item: photoData, index: number }) => {
        const { uri, latitude, longitude } = item;

        return <ImageAddressComponent uri={uri} latitude={latitude} longitude={longitude} photoAddress={photosCity} index={index} navigation={navigation} />
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
                {photoData.length === 0 ? <Text style={{ paddingRight: 10 }}>Add photo</Text> : null}
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
        marginTop: '50%'
    },
    textLocationStyle: {
        flex: 1,
        flexWrap: 'wrap'
    }
})

export default MyPhotosComponent;