import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image, SectionList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <SectionList
                    sections={sectionObj}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.thumbnailUrl }}
                                    style={styles.imageStyle}
                                />
                            </View>
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text>{title}</Text>
                    )}
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
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: 'red',
    },
    imageStyle: {
        width: 120,
        height: 120,
    }
})

export default PhotosComponent;