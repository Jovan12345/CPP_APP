import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PhotosComponent = ({ photos, albums }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <FlatList
                    data={photos}
                    keyExtractor={item => item.id}
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
        flexDirection: 'row',
        flex: 1
    },
    imageStyle: {
        width: 150,
        height: 150
    }
})

export default PhotosComponent;