import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Comment } from '../interfaces/postInterfaces';

import CommentComponent from '../components/CommentComponent';

const CommentsScreen = () => {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        jsonPlaceholder.get<Comment[]>('/comments', {
            params: {
                _limit: 30
            }
        }).then((res) => setComments(res.data)).catch(err => console.log('error', err))
    }, [])

    const helpRender = () => {
        if (comments.length !== 0) {
            return <CommentComponent comments={comments} />
        }
        return <Text style={styles.loadingTextStyle}>Loading comments...</Text>
    }

    return (
        <SafeAreaView style={styles.container}>
            {helpRender()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingTextStyle: {
        position: 'absolute',
        top: '44%',
        alignSelf: 'center',
        fontSize: 18
    }
})

export default CommentsScreen;