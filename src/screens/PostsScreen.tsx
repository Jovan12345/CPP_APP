import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import jsonPlaceholder from '../apis/jsonPlaceholder';

import PostComponent from '../components/PostComponent';

import { Post } from '../interfaces/postInterfaces';

const PostsScreen = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        jsonPlaceholder.get<Post[]>('/posts', {
            params: {
                _limit: 30
            }
        }).then((res) => setPosts(res.data)).catch(err => console.log('error', err))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ alignSelf: "center" }}>Posts Screen</Text>
            <PostComponent posts={posts} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PostsScreen;