import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Posts Screen</Text>
            <PostComponent posts={posts} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default PostsScreen;