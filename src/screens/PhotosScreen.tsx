import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PhotosComponent from '../components/PhotosComponent';

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Photos, Album } from '../interfaces/postInterfaces';

const PhotosScreen = () => {

    const [photos, setPhotos] = useState<Photos[]>([])
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        jsonPlaceholder.get<Album[]>('/albums', {
            params: {
                _limit: 10
            }
        }).then((res) => {
            setAlbums(res.data)
            return jsonPlaceholder.get<Photos[]>('/photos', {
                params: {
                    _limit: 30
                }
            })
        }).then((res) => {
            setPhotos(res.data)
        })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Photos Screen</Text>
            <PhotosComponent photos={photos} albums={albums} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default PhotosScreen;