import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PhotosComponent = ({ photos, albums }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <FlatList
                    numColumns={3}
                    data={photos}
                    keyExtractor={item => item.id.toString()}
                    style={{}}
                    contentContainerStyle={{}}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <Image
                                    source={{ uri: item.url }}
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