import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const PostComponent = ({ posts }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.containerHeaders}>
                                <Text style={{ paddingBottom: 5, paddingHorizontal: 15 }}>Post title:  </Text>
                                <Text style={{ paddingBottom: 5, flex: 1, flexWrap: 'wrap' }}>{item.title.replace(/\n/g, ' ')}</Text>

                            </View>
                            <View style={styles.containerBody}>
                                <Text style={{paddingHorizontal: 15}}>Post body:</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap' }}>{item.body.replace(/\n/g, ' ')}</Text>
                            </View>
                        </View>
                    )
                }}
            />
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
        flex: 1
    },
    containerHeaders: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row'
    },
    containerBody: {
        margin: 10,
        flex: 1,
        flexDirection: 'row'
    }
})

export default PostComponent;