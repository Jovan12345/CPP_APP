import React from 'react'
import { FlatList, StyleSheet, Text, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CommentComponent = ({ comments }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <FlatList
                    data={comments}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <View style={styles.containerHeaders}>
                                    <Text style={{ paddingBottom: 5 }}>Title: </Text>
                                    <Text>Post: </Text>
                                </View>
                                <View style={styles.containerBody}>
                                    <Text style={{ paddingBottom: 5 }}>{item.name}</Text>
                                    <Text>{item.body}</Text>
                                </View>
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
    containerHeaders: {
        margin: 10,
    },
    containerBody: {
        margin: 10,
    }
})

export default CommentComponent;