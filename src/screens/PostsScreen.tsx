import React, { useEffect, useState } from 'react';
import { StyleSheet, Text,  SafeAreaView } from 'react-native';

import jsonPlaceholder from '../apis/jsonPlaceholder';
import ListSectionsComponent from '../components/ListSectionsComponent';

import { Post } from '../interfaces/rootInterfaces';

const PostsScreen = () => {
    const [posts, setPosts] = useState<Post[]>([])

    // When the component is mounted, a request is made to the jsonplaceholder api to get the posts
    useEffect(() => {
        jsonPlaceholder.get<Post[]>('/posts', {
            params: {
                _limit: 50
            }
        }).then((res) => setPosts(res.data)).catch(err => console.log('error', err))
    }, [])

    // The posts are rendered in the child component PostComponent
    const helpRender = () => {
        if (posts.length !== 0) {
            return <ListSectionsComponent data={posts} titleOne={"Post title:  "} titleTwo={"Post body:"} type={"post"}/>
        }
        return <Text style={styles.loadingTextStyle}>Loading posts...</Text>
    }

    return (
        <SafeAreaView style={styles.container}>
            {helpRender()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingTextStyle: {
        position: 'absolute',
        top: '44%',
        alignSelf: 'center',
        fontSize: 18
    }
})

export default PostsScreen;