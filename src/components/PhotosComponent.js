import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image, SectionList, ScrollView, SafeAreaView } from 'react-native'

const PhotosComponent = ({ photos, albums }) => {

    const findTitle = (searchId) => {
        let findserach = albums.find(idx => idx.id === searchId);
        return findserach.title
    }

    const sectionObj = photos.map(value => {
        let newObj = {};
        newObj = { 'title': findTitle(value.data[0].albumId), 'data': value.data }
        return newObj;
    })
    console.log(sectionObj.map(item => console.log(item)))
    return (
        <ScrollView style={{ flex: 1, }}>
            {sectionObj.map((item, index) => {
                return (
                    <View key={item.title + index}>
                        <Text>{item.title}</Text>
                        <FlatList
                            numColumns={3}
                            data={item.data}
                            keyExtractor={(item, index) => item.id + index}
                            style={{ flex: 1, }}
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
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'green'
    },
    imageStyle: {
        width: 120,
        height: 120,
    }
})

export default PhotosComponent;