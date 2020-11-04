import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PhotosComponent from '../components/PhotosComponent';

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Photos, Album } from '../interfaces/postInterfaces';
// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

const PhotosScreen = () => {
    const [photos, setPhotos] = useState<Photos[]>([])
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        jsonPlaceholder.get<Album[]>('/albums', {
            params: { _limit: 10 }
        }).then(res => {
            setAlbums(res.data)
            const dataa = res.data.map(async asd => {
                return jsonPlaceholder.get<Photos[]>(`/albums/${asd.id}/photos`, {
                    params: { _limit: 12 }
                })

            })
            Promise.all(dataa).then((completed: any) => setPhotos(completed))
        })
    }, [])

    const helpRender = () => {
        if (photos.length !== 0 && albums.length !== 0) {
            return <PhotosComponent photos={photos} albums={albums} />
        }
        return <Text style={styles.loadingTextStyle}>Loading photos...</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            {helpRender()}
        </View>
    )
}

const styles = StyleSheet.create({
    loadingTextStyle: {
        position: 'absolute',
        top: '44%',
        alignSelf: 'center',
        fontSize: 18
    }
})

export default PhotosScreen;