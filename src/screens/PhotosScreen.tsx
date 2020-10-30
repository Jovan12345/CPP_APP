import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PhotosComponent from '../components/PhotosComponent';

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Photos, Album } from '../interfaces/postInterfaces';

const PhotosScreen = () => {

    const [photos, setPhotos] = useState<Photos[]>([])
    const [albums, setAlbums] = useState<Album[]>([])
    let fullresponse: any = [];


    useEffect(() => {
        jsonPlaceholder.get<Album[]>('/albums', {
            params: {
                _limit: 10
            }
        }).then(res => {
            setAlbums(res.data)
            const dataa = res.data.map(async asd => {
               return jsonPlaceholder.get<Photos[]>(`/albums/${asd.id}/photos`, {
                    params: {
                        _limit: 10
                    }
                })
                
            })
            Promise.all(dataa).then((completed:any) => setPhotos(completed))
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Text>Photos Screen</Text>
            <PhotosComponent photos={photos} albums={albums} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default PhotosScreen;