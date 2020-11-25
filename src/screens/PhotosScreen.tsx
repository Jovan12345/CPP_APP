import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PhotosComponent from '../components/PhotosComponent';

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Photos, Album } from '../interfaces/rootInterfaces';

const PhotosScreen = () => {
    const [photos, setPhotos] = useState<Photos[]>([])
    const [albums, setAlbums] = useState<Album[]>([])

    // When the component is mounted a request is made to the jsonplaceholder api to get the albums 
    // and than a chained request to take the photos for the corresponding photos (using the albumId property)
    useEffect(() => {
        jsonPlaceholder.get<Album[]>('/albums', {
            params: { _limit: 3 }
        }).then(res => {
            setAlbums(res.data)
            const albumsRes = res.data.map(async albumRes => {
                return jsonPlaceholder.get<Photos[]>(`/albums/${albumRes.id}/photos`, {
                    params: { _limit: 6 }
                })

            })
            // The promise is used to wait for both requests to the jsonplaceholder api to finish before updating the state and rerendering the Component
            Promise.all(albumsRes).then((completed: any) => setPhotos(completed))
        })
    }, [])

    // The albums title and the actual photos for the albums are rendered in the PhotosComponent
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