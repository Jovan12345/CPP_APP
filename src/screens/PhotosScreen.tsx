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
                _limit: 2
            }
        }).then((res) => {
            setAlbums(res.data)
            console.log('Albums', res.data)
            res.data.map(asd => {
                jsonPlaceholder.get<Photos[]>(`/albums/${asd.id}/photos`, {
                    params: {
                        _limit: 3
                    }
                }).then((responeAlbum => {
                    responeAlbum.data.map(element => {
                        
                        setPhotos([...photos, element])
                    })
                }))
            })
            // return jsonPlaceholder.get<Photos>('/photos',{
            //     params:{
            //         _limit: 500
            //     }
            // })
        })
    }, [])

    console.log('Final state photos', photos)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Photos Screen</Text>
            {/* <PhotosComponent photos={photos} albums={albums} /> */}
        </View>
    )
}

const styles = StyleSheet.create({})

export default PhotosScreen;