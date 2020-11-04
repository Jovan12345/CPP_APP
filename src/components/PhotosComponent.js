import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image, ScrollView } from 'react-native'

const PhotosComponent = ({ photos, albums }) => {

    // Function is created to take out the album titles from the list of albums
    const findTitle = (searchId) => {
        let findserach = albums.find(idx => idx.id === searchId);
        return findserach.title
    }

    // Function is created to make an object with {title: 'album title', data: ['photos']}, which is than used to iterate though and show the photos
    const sectionObj = photos.map(value => {
        let newObj = {};
        newObj = { 'title': findTitle(value.data[0].albumId), 'data': value.data }
        return newObj;
    })

    return (
        <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            {sectionObj.map((item, index) => {
                return (
                    <View key={item.title + index} >
                        <Text style={styles.albumTitle}>{item.title.replace(/\n/g, ' ')}</Text>
                        <ScrollView style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                            <View style={styles.albumStyle}>
                                {item.data.map((item, index) => {
                                    return (
                                        <View
                                            key={item.id + index}
                                            style={{
                                                marginBottom: 20
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.thumbnailUrl }}
                                                style={styles.imageStyle}
                                            />
                                            <Text style={{ alignSelf: 'center' }}>{index + 1}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    albumStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    albumTitle: {
        flex: 1,
        textAlign: "center",
        backgroundColor: '#c4faf7',
        padding: 10,
        fontSize: 17
    },
    imageStyle: {
        width: 150,
        height: 150,
        marginBottom: 10
    }
})

export default PhotosComponent;