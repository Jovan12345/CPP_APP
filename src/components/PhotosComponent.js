import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PhotosComponent = ({ photos, albums }) => {

    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    
    if (!photos || photos === undefined) {
        return <Text>Loading</Text>
    }

    const groupByAlbumId = groupBy('albumId');
    const groupPhotosByAlbumId = groupByAlbumId(photos)

    // console.log('update photos component', groupPhotosByAlbumId['1'])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <FlatList
                    numColumns={3}
                    data={photos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.thumbnailUrl }}
                                    style={styles.imageStyle}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    container: {
        borderTopWidth: 2,
        borderTopColor: 'grey',
    },
    imageStyle: {
        width: 120,
        height: 120,
    }
})

export default PhotosComponent;