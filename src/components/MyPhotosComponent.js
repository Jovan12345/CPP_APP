import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import ImageAddressComponent from './ImageAddressComponent'


const MyPhotosComponent = () => {
    const [photo, setPhoto] = useState({})
    const myPhotos = useSelector((state) => state.photos);
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
            noData: true,
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
                setPhoto({
                    uri: res.uri,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    fileName: res.fileName
                })
            }
        });
    };

    const renderItemFunc = ({item, index}) => {
        const {uri, latitude, longitude} = item;
        
        return <ImageAddressComponent uri={uri} latitude={latitude} longitude={longitude}/>
      };

    return (
        <View style={styles.container}>
            <FlatList
                data={photoData}
                renderItem={renderItemFunc}
                keyExtractor={item => item.fileName}
            />
            <TouchableOpacity style={styles.plusIcon} onPress={chooseImg}>
                <Icon
                    name="pluscircle"
                    size={50}
                    color="#009688"
                />
            </TouchableOpacity>
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
    }
})

export default MyPhotosComponent;